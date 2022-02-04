import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ScheduledNotifyService } from './scheduled-notify.service';
import { CreateScheduledNotifyDto } from './dto/create-scheduled-notify.dto';
import { UpdateScheduledNotifyDto } from './dto/update-scheduled-notify.dto';

@Controller('scheduled-notify')
export class ScheduledNotifyController {
  constructor(
    private readonly scheduledNotifyService: ScheduledNotifyService,
  ) {}

  @Post()
  create(@Body() createScheduledNotifyDto: CreateScheduledNotifyDto) {
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

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateScheduledNotifyDto: UpdateScheduledNotifyDto,
  ) {
    return this.scheduledNotifyService.update(+id, updateScheduledNotifyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scheduledNotifyService.remove(+id);
  }
}
