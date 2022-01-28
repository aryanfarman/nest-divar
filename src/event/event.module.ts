import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from './entities/event.entity';
import { LoggerModule } from '../logger/logger.module';
import { ConsoleColorEnum } from '../enum/console-color.enum';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventEntity]),
    LoggerModule.register('event', ConsoleColorEnum.YELLOW),
  ],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
