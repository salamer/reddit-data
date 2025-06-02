import {
  Body,
  Get,
  Post,
  Route,
  Tags,
  Security,
  Request,
  Path,
  Query,
  Controller,
  Res,
  TsoaResponse,
  SuccessResponse,
} from "tsoa";
import { AppDataSource, Like } from "./models";
import { Posts, User } from "./models";
import { uploadBase64ToObjectStorage } from "./objectstorage.service";
import type { JwtPayload } from "./utils";
import { In } from "typeorm";
import { getCurrentUser } from "./auth.middleware";

export interface CreatePostBase64Input {
  imageBase64: string;
  imageFileType: string;
  title: string;
  content: string;
  subreddit: string;
}

export interface PostResponse {
  id: number;
  imageUrl: string;
  title: string;
  content: string | null;
  subreddit: string | null;
  createdAt: Date;
  userId: number;
  username: string;
  avatarUrl: string | null;
  hasLiked: boolean;
}

@Route("posts")
@Tags("Posts")
export class PostController extends Controller {
  // @Security("jwt")
  @Post("")
  @SuccessResponse(200, "Post Created")
  public async createPost(
    @Request() req: Express.Request,
    @Body() body: CreatePostBase64Input,
    @Res() badRequestResponse: TsoaResponse<400, { message: string }>,
    @Res() serverErrorResponse: TsoaResponse<500, { message: string }>
  ): Promise<PostResponse> {
    // const currentUser = req.user as JwtPayload;
    const currentUser = getCurrentUser();

    if (!body.imageBase64 || !body.imageFileType.startsWith("image/")) {
      return badRequestResponse(400, {
        message: "imageBase64 and a valid imageFileType are required.",
      });
    }

    let base64Data = body.imageBase64;
    const prefixMatch = body.imageBase64.match(/^data:(image\/\w+);base64,/);
    if (prefixMatch) {
      base64Data = body.imageBase64.substring(prefixMatch[0].length);
    }

    try {
      const uploadResult = await uploadBase64ToObjectStorage(
        base64Data,
        body.imageFileType
      );

      const postRepo = AppDataSource.getRepository(Posts);
      const newPost = postRepo.create({
        userId: currentUser.userId,
        imageUrl: uploadResult.objectUrl,
        title: body.title,
        content: body.content,
        subreddit: body.subreddit,
      });
      const savedPost = await postRepo.save(newPost);

      const user = await AppDataSource.getRepository(User).findOneBy({
        id: currentUser.userId,
      });

      this.setStatus(200);
      return {
        ...savedPost,
        username: user?.username || "unknown",
        avatarUrl: user?.avatarUrl || null,
        hasLiked: false, // Default to false, implement like logic separately
      };
    } catch (error: any) {
      console.error("Post creation failed:", error);
      return serverErrorResponse(500, {
        message: error.message || "Failed to create post.",
      });
    }
  }

  // @Security("jwt", ["optional"])
  @Get("search")
  public async searchPosts(
    @Request() req: Express.Request,
    @Query() query: string,
    @Query() limit: number = 10,
    @Query() offset: number = 0,
    @Res() badRequestResponse: TsoaResponse<400, { message: string }>
  ): Promise<PostResponse[]> {
    if (!query.trim().length) {
      console.warn("Empty search query received");
      return badRequestResponse(400, {
        message: "Search query cannot be empty",
      });
    }
    const searchTerm = query.trim().split(/\s+/).join(" & ");

    const posts = await AppDataSource.getRepository(Posts)
      .createQueryBuilder("posts")
      .leftJoinAndSelect("posts.user", "user")
      .where("to_tsvector(posts.content) @@ plainto_tsquery(:query)", {
        query: searchTerm,
      })
      .orderBy("posts.createdAt", "DESC")
      .take(limit)
      .skip(offset)
      .getMany();

    // const currentUser = req.user as JwtPayload;
    const currentUser = getCurrentUser();
    const likes =
      currentUser && currentUser.userId
        ? await AppDataSource.getRepository(Like).find({
            where: {
              userId: currentUser.userId,
              postId: In(posts.map((p) => p.id)),
            },
          })
        : [];

    return posts
      .filter((post) => post.user !== null)
      .map((post) => ({
        id: post.id,
        imageUrl: post.imageUrl,
        title: post.title,
        content: post.content,
        subreddit: post.subreddit,
        createdAt: post.createdAt,
        userId: post.userId,
        username: post.user?.username || "unknown",
        avatarUrl: post.user?.avatarUrl || null,
        hasLiked: likes.some((like) => like.postId === post.id),
      }));
  }

  // @Security("jwt", ["optional"])
  @Get("{postId}")
  public async getPostById(
    @Request() req: Express.Request,
    @Path() postId: number,
    @Res() notFoundResponse: TsoaResponse<404, { message: string }>
  ): Promise<PostResponse> {
    const post = await AppDataSource.getRepository(Posts).findOne({
      where: { id: postId },
      relations: ["user"],
    });

    if (!post) {
      return notFoundResponse(404, { message: "Post not found" });
    }

    // const currentUser = req.user as JwtPayload;
    const currentUser = getCurrentUser();
    const likes =
      currentUser && currentUser.userId
        ? await AppDataSource.getRepository(Like).find({
            where: {
              userId: currentUser.userId,
              postId: post.id,
            },
          })
        : [];

    return {
      id: post.id,
      imageUrl: post.imageUrl,
      title: post.title,
      content: post.content,
      subreddit: post.subreddit,
      createdAt: post.createdAt,
      userId: post.userId,
      username: post.user?.username || "unknown",
      avatarUrl: post.user?.avatarUrl || null,
      hasLiked: likes.some((like) => like.postId === post.id),
    };
  }

  // @Security("jwt", ["optional"])
  @Get("")
  public async getFeedPosts(
    @Request() req: Express.Request,
    @Query() limit: number = 10,
    @Query() offset: number = 0
  ): Promise<PostResponse[]> {
    const posts = await AppDataSource.getRepository(Posts).find({
      relations: ["user"],
      order: { createdAt: "DESC" },
      take: limit,
      skip: offset,
    });

    // const currentUser = req.user as JwtPayload;
    const currentUser = getCurrentUser();
    const likes =
      currentUser && currentUser.userId
        ? await AppDataSource.getRepository(Like).find({
            where: {
              userId: currentUser.userId,
              postId: In(posts.map((p) => p.id)),
            },
          })
        : [];

    return posts.map((post) => ({
      id: post.id,
      imageUrl: post.imageUrl,
      title: post.title,
      content: post.content,
      subreddit: post.subreddit,
      createdAt: post.createdAt,
      userId: post.userId,
      username: post.user?.username || "unknown",
      avatarUrl: post.user?.avatarUrl || null,
      hasLiked: likes.some((like) => like.postId === post.id),
    }));
  }

  // @Security("jwt", ["optional"])
  @Get("/r/{subreddit}")
  public async getPostsBySubreddit(
    @Request() req: Express.Request,
    @Path() subreddit: string,
    @Res() notFoundResponse: TsoaResponse<404, { message: string }>
  ): Promise<PostResponse[]> {
    const posts = await AppDataSource.getRepository(Posts)
      .createQueryBuilder("posts")
      .leftJoinAndSelect("posts.user", "user")
      .where("posts.subreddit = :subreddit", { subreddit })
      .orderBy("posts.createdAt", "DESC")
      .getMany();

    // const currentUser = req.user as JwtPayload;
    const currentUser = getCurrentUser();
    const likes =
      currentUser && currentUser.userId
        ? await AppDataSource.getRepository(Like).find({
            where: {
              userId: currentUser.userId,
              postId: In(posts.map((p) => p.id)),
            },
          })
        : [];

    return posts
      .filter((post) => post.user !== null)
      .map((post) => ({
        id: post.id,
        imageUrl: post.imageUrl,
        title: post.title,
        content: post.content,
        subreddit: post.subreddit,
        createdAt: post.createdAt,
        userId: post.userId,
        username: post.user?.username || "unknown",
        avatarUrl: post.user?.avatarUrl || null,
        hasLiked: likes.some((like) => like.postId === post.id),
      }));
  }
}
