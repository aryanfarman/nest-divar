import { Module } from '@nestjs/common';
import { ScheduledNotifyService } from './scheduled-notify.service';
import { HttpModule } from '@nestjs/axios';
import { ScheduledNotifyController } from './scheduled-notify.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduledNotify } from './entities/scheduled-notify.entity';
import { PostModule } from '../post/post.module';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    PostModule,
    UserModule,
    TypeOrmModule.forFeature([ScheduledNotify]),
  ],
  providers: [ScheduledNotifyService],
  controllers: [ScheduledNotifyController],
})
export class ScheduledNotifyModule {}
