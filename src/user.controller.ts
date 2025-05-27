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
} from 'tsoa';
import { AppDataSource, User, Posts } from './models';
import type { JwtPayload } from './utils';
import { PostResponse } from './post.controller';

interface UserProfileResponse {
  id: number;
  username: string;
  bio: string | null;
  avatarUrl: string | null;
  createdAt: Date;
}

@Route('users')
@Tags('Users')
export class UserController extends Controller {
  @Get('{userId}/profile')
  public async getUserProfile(
    @Path() userId: number,
    @Res() notFound: TsoaResponse<404, { message: string }>,
  ): Promise<UserProfileResponse> {
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOneBy({ id: userId });
    if (!user) {
      return notFound(404, { message: 'User not found' });
    }

  
    return {
      id: user.id,
      username: user.username,
      bio: user.bio,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
    };
  }

  @Get('{userId}/likes')
  public async getUserLikes(
    @Path() userId: number,
    @Res() notFound: TsoaResponse<404, { message: string }>,
  ): Promise<PostResponse[]> {
    const user = await AppDataSource.getRepository(User).findOneBy({
      id: userId,
    });
    if (!user) {
      return notFound(404, { message: 'User not found' });
    }

    const posts = await AppDataSource.getRepository(Posts).find({
      where: { userId },
      relations: ['user'],
    });

    if (posts.length === 0) {
      return notFound(404, { message: 'No liked posts found for this user.' });
    }

    return posts.filter(
      (post) => post.imageUrl !== null && post.subreddit !== null
    ).map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      userId: post.userId,
      username: post.user.username,
      avatarUrl: post.user.avatarUrl,
      createdAt: post.createdAt,
      imageUrl: post.imageUrl,
      subreddit: post.subreddit,
    }));
  }
}
