import { Post } from '../post/entities/post.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreatePostDto } from '../post/dto/create-post.dto';
import { Category } from '../post/entities/category.entity';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  async createPost(createPostDto: CreatePostDto, categories: Category[]) {
    const post = this.create({
      ...createPostDto,
      categories,
    });
    return this.save(post);
  }
}
