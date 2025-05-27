import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  DataSource,
  DataSourceOptions,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import config from './config';

export const schema = 'reddit';

@Entity({ schema, name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  username: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ name: 'password_hash' })
  passwordHash: string;

  @Column({ type: 'text', nullable: true })
  bio: string | null;

  @Column({ name: 'avatar_url', type: 'text', nullable: true })
  avatarUrl: string | null;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}

@Entity({ schema, name: 'posts' })
export class Posts extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'image_url', type: 'text' })
  imageUrl: string;


  @Column({
    name: 'title',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  title: string;

  @Column({ type: 'text', nullable: true })
  content: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  subreddit: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: number;
}

@Entity({ schema, name: 'comments' })
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => Posts)
  @JoinColumn({ name: 'post_id' })
  post: Posts;

  @Column({ name: 'post_id' })
  postId: number;
}

@Entity({ schema, name: 'likes' })
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => Posts)
  @JoinColumn({ name: 'post_id' })
  post: Posts;

  @Column({ name: 'post_id' })
  postId: number;
}

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: config.DATABASE_URL,
  synchronize: false,
  logging: true,
  entities: [User, Posts, Comment, Like],

  subscribers: [],
  migrations: [],
});
