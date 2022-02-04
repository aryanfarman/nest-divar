import { Module } from '@nestjs/common';
import { ScheduledNotifyService } from './scheduled-notify.service';
import { HttpModule } from '@nestjs/axios';
import { ScheduledNotifyController } from './scheduled-notify.controller';

@Module({
  imports: [HttpModule],
  providers: [ScheduledNotifyService],
  controllers: [ScheduledNotifyController],
})
export class ScheduledNotifyModule {}
