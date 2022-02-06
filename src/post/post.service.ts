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
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { EventTypeEnum } from '../event/entities/event.entity';
import { RefTypeEnum } from '../enum/ref-type.enum';
import { EventRepository } from '../event/event.repository';
import { CURRENCY_SIGN } from '../currency/constants/token.constant';
import { LOG } from '../logger/constants/token.constants';
import { UserRepository } from '../repositories/user.repository';
import { CategoryRepository } from '../repositories/category.repository';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    private readonly categoryRepository: CategoryRepository,
    private readonly eventRepository: EventRepository,
    private readonly userRepository: UserRepository,
    private readonly connection: Connection,
    @Inject(CURRENCY_SIGN) private readonly currencySign: string,
    @Inject(LOG + `post`) private readonly log,
  ) {
    this.log('hi from post');
  }

  async create(createPostDto: CreatePostDto) {
    const categories = await Promise.all(
      createPostDto.categories.map((name) =>
        this.categoryRepository.preloadCategoryByName(name),
      ),
    );
    const post = this.postRepository.create({
      ...createPostDto,
      categories,
    });
    return this.postRepository.save(post);
  }

  async findAll(paginationQuery?: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return await this.postRepository.find({
      relations: ['categories', 'user'],
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: number) {
    const result = await this.postRepository.findOne(id, {
      relations: ['categories', 'user'],
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
          this.categoryRepository.preloadCategoryByName(name),
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
      const myEvent = await this.eventRepository.getEventByUser(
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
      const event = this.eventRepository.createEvent(type, post);
      event.user = await this.userRepository.findById(userId);
      await queryRunner.manager.save(event);
      await queryRunner.commitTransaction();
      return post;
    } catch (e) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
