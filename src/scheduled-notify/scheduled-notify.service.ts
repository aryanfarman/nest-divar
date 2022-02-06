import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateScheduledNotifyDto } from './dto/create-scheduled-notify.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduledNotify } from './entities/scheduled-notify.entity';
import { Repository } from 'typeorm';
import { CategoryService } from '../post/category.service';
import { UserService } from '../user/user.service';
import { getCars } from 'divar';

@Injectable()
export class ScheduledNotifyService {
  constructor(
    @InjectRepository(ScheduledNotify)
    private readonly scheduledNotifyRepository: Repository<ScheduledNotify>,
    private readonly categoryService: CategoryService,
    private readonly userService: UserService,
  ) {}

  async create(createScheduledNotifyDto: CreateScheduledNotifyDto) {
    if (typeof createScheduledNotifyDto.kilometer == 'undefined') {
      createScheduledNotifyDto.kilometer = 5000000;
    }
    const category = await this.categoryService.findOne(
      createScheduledNotifyDto.categoryFK,
    );
    if (!category)
      throw new NotFoundException(
        'category id must be valid get valid ids from route /categories',
      );
    const scheduledEntity = this.scheduledNotifyRepository.create({
      categoryFK: await this.categoryService.findOne(
        createScheduledNotifyDto.categoryFK,
      ),
      userFK: await this.userService.findOne(createScheduledNotifyDto.userFK),
      price: createScheduledNotifyDto.price,
      kilometer: createScheduledNotifyDto.kilometer,
    });
    const flag = await this.scheduledNotifyRepository.findOne({
      where: {
        categoryFK: scheduledEntity.categoryFK.id,
        userFK: scheduledEntity.userFK.id,
      },
    });
    const res = await this.getDataFromDivar(
      scheduledEntity.categoryFK.name,
      scheduledEntity.price,
      scheduledEntity.kilometer,
    );
    if (res.length == 0) {
      return 'there is no match for your search';
    }
    if (flag) {
      return res;
    }
    await this.scheduledNotifyRepository.save(scheduledEntity);
    return res;
  }

  async getDataFromDivar(category, price, kilometer) {
    const dataFromDivar = await getCars(category);
    return dataFromDivar.filter((item) => {
      item.kilometer = item.kilometer.replace('KM', '');
      if (item.price <= +price && +item.kilometer <= kilometer) {
        item.kilometer += 'KM';
        return item;
      }
    });
  }

  findAll() {
    return this.scheduledNotifyRepository.find({
      relations: ['userFK', 'categoryFK'],
    });
  }

  findOne(id: number) {
    return this.scheduledNotifyRepository.findOne(id, {
      relations: ['userFK', 'categoryFK'],
    });
  }
}
