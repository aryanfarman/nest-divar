import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Connection, Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { EventEntity, EventTypeEnum } from '../event/entities/event.entity';
import { RefTypeEnum } from '../enum/ref-type.enum';
import { EventService } from '../event/event.service';
import { User } from '../user/entities/user.entity';
import { CURRENCY_SIGN } from '../currency/constants/token.constant';
import { LOG } from '../logger/constants/token.constants';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly connection: Connection,
    private readonly eventService: EventService,
    @Inject(CURRENCY_SIGN) private readonly currencySign: string,
    @Inject(LOG) private readonly prefix,
  ) {
    this.prefix('hi');
  }

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

  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return await this.postRepository.find({
      relations: ['categories', 'userFK'],
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: number) {
    const result = await this.postRepository.findOne(id, {
      relations: ['categories', 'userFK'],
    });
    if (!result) {
      throw new NotFoundException();
    }
    return result;
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

  async event(id: number, type: EventTypeEnum, userId: number) {
    const queryRunner = this.connection.createQueryRunner();
    let post = await this.findOne(id);
    if (type == EventTypeEnum.Liked) {
      post.likeCount++;
      const myEvent = await this.eventService.getEventByUser(
        post.postId,
        RefTypeEnum.Post,
        userId,
        EventTypeEnum.Liked,
      );
      if (myEvent) {
        throw new BadRequestException();
      }
    }
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      post = await queryRunner.manager.save(post);
      const event = await this.eventRepository.create({
        message: type,
        refID: post.postId,
        refType: RefTypeEnum.Post,
      });
      event.user = await this.userRepository.findOne(userId);
      await queryRunner.manager.save(event);
      await queryRunner.commitTransaction();
      return post;
    } catch (e) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  private async preloadCategoryByName(name: string): Promise<Category> {
    const existingCategory = await this.categoryRepository.findOne({ name });
    if (existingCategory) {
      return existingCategory;
    }
    return this.categoryRepository.create({ name });
  }
}
