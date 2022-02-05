import { IsString } from 'class-validator';
import { PickType } from '@nestjs/swagger';
import { Post } from '../entities/post.entity';

export class CreatePostDto extends PickType(Post, [
  'content',
  'location',
  'price',
  'title',
] as const) {
  @IsString({ each: true })
  categories: string[];
}
