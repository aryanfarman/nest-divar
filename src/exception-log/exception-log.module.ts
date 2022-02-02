import { Module } from '@nestjs/common';
import { ExceptionLogService } from './exception-log.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExceptionLog } from './entities/exception-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExceptionLog])],
  providers: [ExceptionLogService],
  exports: [ExceptionLogService],
})
export class ExceptionLogModule {}
