import { Controller, Get, Param, Post, Query, UsePipes } from '@nestjs/common';
import { ScheduledNotifyService } from './scheduled-notify.service';
import { CreateScheduledNotifyDto } from './dto/create-scheduled-notify.dto';
import { MoneyPipe } from '../common/pipes/money-pipe.pipe';

@Controller('scheduled-notify')
export class ScheduledNotifyController {
  constructor(
    private readonly scheduledNotifyService: ScheduledNotifyService,
  ) {}

  @Post()
  @UsePipes(MoneyPipe)
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
