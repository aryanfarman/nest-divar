import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Connection, Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Event, EventType } from '../event/entities/event.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    private readonly connection: Connection,
  ) {}
  async create(createPostDto: CreatePostDto) {
    const categories = await Promise.all(
      createPostDto.categories.map((name) => this.preloadCategoryByName(name)),
    );
    const post = this.postRepository.create({
      ...createPostDto,
      categories,
    });
    return this.postRepository.save(post);
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.postRepository.find({
      relations: ['categories', 'userFK'],
      skip: offset,
      take: limit,
    });
  }

  findOne(id: number) {
    return this.postRepository.findOne(id, {
      relations: ['categories', 'userFK'],
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const categories =
      updatePostDto.categories &&
      (await Promise.all(
        updatePostDto.categories.map((name) =>
          this.preloadCategoryByName(name),
        ),
      ));
    const post = await this.postRepository.preload({
      postId: id,
      ...updatePostDto,
      categories,
    });
    return this.postRepository.save(post);
  }

  async remove(id: number) {
    const post = await this.postRepository.findOne(id);
    return this.postRepository.remove(post);
  }
  private async preloadCategoryByName(name: string): Promise<Category> {
    const existingCategory = await this.categoryRepository.findOne({ name });
    if (existingCategory) {
      return existingCategory;
    }
    return this.categoryRepository.create({ name });
  }
  async event(id: number, type: EventType) {
    const queryRunner = this.connection.createQueryRunner();
    let post = await this.findOne(id);
    if (type == EventType.Liked) {
      post.likeCount++;
    }
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      post = await queryRunner.manager.save(post);
      const event = this.eventRepository.create({
        message: type,
        refID: post.postId,
        refType: 'Post',
      });
      await queryRunner.manager.save(event);
      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
