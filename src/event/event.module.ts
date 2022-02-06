import { Module } from '@nestjs/common';
import { EventRepository } from './event.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EventRepository])],
  providers: [],
  exports: [],
})
export class EventModule {}
