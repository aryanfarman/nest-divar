import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreatePostDto } from '../post/dto/create-post.dto';
import { LOG } from '../logger/constants/token.constants';
import { UtilityService } from '../utility/utility.service';
import { PostRepository } from '../repositories/post.repository';
import { CategoryRepository } from '../repositories/category.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly postRepository: PostRepository,
    private readonly categoryRepository: CategoryRepository,
    @Inject(LOG + `user`) private readonly log,
    private readonly utilityService: UtilityService,
  ) {
    this.log('hi from user');
  }

  async create(createUserDto: CreateUserDto) {
    const flag = this.utilityService.confirmPasswords(
      createUserDto.password,
      createUserDto.confirmPassword,
    );
    if (!flag) {
      throw new BadRequestException('Those passwords didn’t match. Try again.');
    }
    createUserDto.password = this.utilityService.hash(createUserDto.password);
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
    const categories = await Promise.all(
      createPostDto.categories.map((name) =>
        this.categoryRepository.preloadCategoryByName(name),
      ),
    );
    const post = await this.postRepository.createPost(
      createPostDto,
      categories,
    );
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user does not exist!');
    }
    user.posts.push(post);
    await this.userRepository.save(user);
    return post;
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return await this.userRepository.remove(user);
  }
}
