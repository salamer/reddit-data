import {
  Body,
  Get,
  Post as HttpPost,
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
} from 'tsoa';
import { AppDataSource } from './models';
import { Post, User } from './models';
import { uploadBase64ToObjectStorage } from './objectstorage.service';
import type { JwtPayload } from './utils';

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
}

@Route('posts')
@Tags('Posts')
export class PostController extends Controller {
  @Security('jwt')
  @HttpPost('')
  @SuccessResponse(200, 'Post Created')
  public async createPost(
    @Request() req: Express.Request,
    @Body() body: CreatePostBase64Input,
    @Res() badRequestResponse: TsoaResponse<400, { message: string }>,
    @Res() serverErrorResponse: TsoaResponse<500, { message: string }>,
  ): Promise<PostResponse> {
    const currentUser = req.user as JwtPayload;

    if (!body.imageBase64 || !body.imageFileType.startsWith('image/')) {
      return badRequestResponse(400, {
        message: 'imageBase64 and a valid imageFileType are required.',
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
        body.imageFileType,
      );

      const postRepo = AppDataSource.getRepository(Post);
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
        username: user?.username || 'unknown',
        avatarUrl: user?.avatarUrl || null,
      };
    } catch (error: any) {
      console.error('Post creation failed:', error);
      return serverErrorResponse(500, {
        message: error.message || 'Failed to create post.',
      });
    }
  }

  @Get('')
  public async getFeedPosts(
    @Query() limit: number = 10,
    @Query() offset: number = 0,
  ): Promise<PostResponse[]> {
    const posts = await AppDataSource.getRepository(Post).find({
      relations: ['user'],
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
    });

    return posts.map((post) => ({
      id: post.id,
      imageUrl: post.imageUrl,
      title: post.title,
      content: post.content,
      subreddit: post.subreddit,
      createdAt: post.createdAt,
      userId: post.userId,
      username: post.user?.username || 'unknown',
      avatarUrl: post.user?.avatarUrl || null,
    }));
  }

  @Get('/r/{subreddit}')
  public async getPostsBySubreddit(
    @Path() subreddit: string,
    @Query() limit: number = 10,
    @Query() offset: number = 0,
    @Res() notFoundResponse: TsoaResponse<404, { message: string }>,
  ): Promise<PostResponse[]> {
    const posts = await AppDataSource.getRepository(Post)
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .where('post.subreddit = :subreddit', { subreddit })
      .orderBy('post.createdAt', 'DESC')
      .take(limit)
      .skip(offset)
      .getMany();
    if (posts.length === 0) {
      return notFoundResponse(404, { message: 'Subreddit not found' });
    }   

    return posts.map((post) => ({
      id: post.id,
      imageUrl: post.imageUrl,
      title: post.title,
      content: post.content,
      subreddit: post.subreddit,
      createdAt: post.createdAt,
      userId: post.userId,
      username: post.user?.username || 'unknown',
      avatarUrl: post.user?.avatarUrl || null,
    }));
  }

  @Get('search')
  public async searchPosts(
    @Query() query: string,
    @Query() limit: number = 10,
    @Query() offset: number = 0,
    @Res() badRequestResponse: TsoaResponse<400, { message: string }>,
  ): Promise<PostResponse[]> {
    if (!query.trim()) {
      return badRequestResponse(400, {
        message: 'Search query cannot be empty',
      });
    }
    const searchTerm = query.trim().split(/\s+/).join(' & ');

    const posts = await AppDataSource.getRepository(Post)
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .where('to_tsvector(post.content) @@ plainto_tsquery(:query)', {
        query: searchTerm,
      })
      .orderBy('post.createdAt', 'DESC')
      .take(limit)
      .skip(offset)
      .getMany();

    return posts.map((post) => ({
      id: post.id,
      imageUrl: post.imageUrl,
      title: post.title,
      content: post.content,
      subreddit: post.subreddit,
      createdAt: post.createdAt,
      userId: post.userId,
      username: post.user?.username || 'unknown',
      avatarUrl: post.user?.avatarUrl || null,
    }));
  }

  @Get('{postId}')
  public async getPostById(
    @Path() postId: number,
    @Res() notFoundResponse: TsoaResponse<404, { message: string }>,
  ): Promise<PostResponse> {
    const post = await AppDataSource.getRepository(Post).findOne({
      where: { id: postId },
      relations: ['user'],
    });

    if (!post) {
      return notFoundResponse(404, { message: 'Post not found' });
    }

    return {
      id: post.id,
      imageUrl: post.imageUrl,
      title: post.title,
      content: post.content,
      subreddit: post.subreddit,
      createdAt: post.createdAt,
      userId: post.userId,
      username: post.user?.username || 'unknown',
      avatarUrl: post.user?.avatarUrl || null,
    };
  }
}
