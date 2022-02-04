import { Injectable } from '@nestjs/common';
import { CreateScheduledNotifyDto } from './dto/create-scheduled-notify.dto';
import { UpdateScheduledNotifyDto } from './dto/update-scheduled-notify.dto';
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
    const scheduledEntity = this.scheduledNotifyRepository.create({
      categoryFK: await this.categoryService.findOne(
        createScheduledNotifyDto.categoryFK,
      ),
      userFK: await this.userService.findOne(createScheduledNotifyDto.userFK),
      price: createScheduledNotifyDto.price,
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
      );
    }
    await this.scheduledNotifyRepository.save(scheduledEntity);
    return await this.getDataFromDivar(
      scheduledEntity.categoryFK.name,
      scheduledEntity.price,
    );
  }

  async getDataFromDivar(category, price) {
    const dataFromDivar = await getCars(category);
    dataFromDivar.map((item) => item.price <= price);
    return dataFromDivar;
  }

  findAll() {
    return `This action returns all scheduledNotify`;
  }

  findOne(id: number) {
    return `This action returns a #${id} scheduledNotify`;
  }

  update(id: number, updateScheduledNotifyDto: UpdateScheduledNotifyDto) {
    return `This action updates a #${id} scheduledNotify`;
  }

  remove(id: number) {
    return `This action removes a #${id} scheduledNotify`;
  }
}
