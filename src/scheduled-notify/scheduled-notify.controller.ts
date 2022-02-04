import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ScheduledNotifyService } from './scheduled-notify.service';
import { CreateScheduledNotifyDto } from './dto/create-scheduled-notify.dto';

@Controller('scheduled-notify')
export class ScheduledNotifyController {
  constructor(
    private readonly scheduledNotifyService: ScheduledNotifyService,
  ) {}

  @Post()
  create(
    @Query()
    createScheduledNotifyDto: CreateScheduledNotifyDto,
  ) {
    return this.scheduledNotifyService.create(createScheduledNotifyDto);
  }

  @Get()
  findAll() {
    return this.scheduledNotifyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scheduledNotifyService.findOne(+id);
  }
}
