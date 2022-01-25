import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Post } from '../post/entities/post.entity';
import { CreatePostDto } from '../post/dto/create-post.dto';
import { PostService } from '../post/post.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    private readonly postService: PostService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.userRepository.find({
      relations: ['posts'],
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id, {
      relations: ['posts'],
    });
    if (!user) {
      throw new NotFoundException('user does not exist!');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto,
    });
    return this.userRepository.save(user);
  }
  async createPost(id: number, createPostDto: CreatePostDto) {
    const post = await this.postService.create(createPostDto);
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user does not exist!');
    }
    user.posts.push(post);
    await this.userRepository.save(user);
    return await this.postRepository.findOne(post.postId);
  }
  async remove(id: number) {
    const user = await this.findOne(id);
    return await this.userRepository.remove(user);
  }
}
