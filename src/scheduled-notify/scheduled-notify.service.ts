import { Injectable } from '@nestjs/common';
import { CreateScheduledNotifyDto } from './dto/create-scheduled-notify.dto';
import { UpdateScheduledNotifyDto } from './dto/update-scheduled-notify.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ScheduledNotifyService {
  constructor(private readonly httpService: HttpService) {
    this.findAll();
  }

  create(createScheduledNotifyDto: CreateScheduledNotifyDto) {
    return 'This action adds a new scheduledNotify';
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
