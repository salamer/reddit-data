import {
  Post,
  Delete,
  Route,
  Tags,
  Security,
  Request,
  Path,
  Controller,
  Res,
  TsoaResponse,
  Get,
  SuccessResponse,
} from "tsoa";
import { AppDataSource, User, Posts, Like } from "./models";
import type { JwtPayload } from "./utils";
import { PostResponse } from "./post.controller";
import { In } from "typeorm";

interface UserProfileResponse {
  id: number;
  username: string;
  bio: string | null;
  avatarUrl: string | null;
  createdAt: Date;
}

@Route("users")
@Tags("Users")
export class UserController extends Controller {
  @Get("{userId}/profile")
  public async getUserProfile(
    @Path() userId: number,
    @Res() notFound: TsoaResponse<404, { message: string }>
  ): Promise<UserProfileResponse> {
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOneBy({ id: userId });
    if (!user) {
      return notFound(404, { message: "User not found" });
    }

    return {
      id: user.id,
      username: user.username,
      bio: user.bio,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
    };
  }

  @Security("jwt", ["optional"])
  @Get("{userId}/likes")
  public async getUserLikes(
    @Request() req: Express.Request,
    @Path() userId: number,
    @Res() notFound: TsoaResponse<404, { message: string }>
  ): Promise<PostResponse[]> {
    const user = await AppDataSource.getRepository(User).findOneBy({
      id: userId,
    });
    if (!user) {
      return notFound(404, { message: "User not found" });
    }

    const posts = await AppDataSource.getRepository(Like).find({
      where: { userId },
      relations: ["user", "post"],
    });

    const currentUser = req.user as JwtPayload;
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
      .filter((post) => post.user !== null && post.post !== null)
      .map((post) => ({
        id: post.id,
        userId: post.user.id,
        username: post.user.username,
        avatarUrl: post.user.avatarUrl,
        createdAt: post.createdAt,
        imageUrl: post.post.imageUrl,
        subreddit: post.post.subreddit,
        title: post.post.title,
        content: post.post.content,
        hasLiked: likes.some((like) => like.postId === post.id),
      }));
  }
}
