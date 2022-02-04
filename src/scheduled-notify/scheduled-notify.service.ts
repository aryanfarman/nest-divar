import { Injectable } from '@nestjs/common';
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
    if (!createScheduledNotifyDto.kilometer) {
      createScheduledNotifyDto.kilometer = 5000000;
    }
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
    if (flag) {
      return await this.getDataFromDivar(
        scheduledEntity.categoryFK.name,
        scheduledEntity.price,
        scheduledEntity.kilometer,
      );
    }
    await this.scheduledNotifyRepository.save(scheduledEntity);
    return await this.getDataFromDivar(
      scheduledEntity.categoryFK.name,
      scheduledEntity.price,
      scheduledEntity.kilometer,
    );
  }

  async getDataFromDivar(category, price, kilometer) {
    const dataFromDivar = await getCars(category);
    return dataFromDivar.filter((item) => {
      item.kilometer = item.kilometer.replace('KM', '');
      if (item.price <= price && +item.kilometer <= kilometer) {
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
