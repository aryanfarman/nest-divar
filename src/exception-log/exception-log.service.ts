import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExceptionLog } from './entities/exception-log.entity';

@Injectable()
export class ExceptionLogService {
  constructor(
    @InjectRepository(ExceptionLog)
    private readonly exceptionLogRepository: Repository<ExceptionLog>,
  ) {}

  async insert(status: number, message: string, url: string, method: string) {
    const log = this.exceptionLogRepository.create({
      status,
      message,
      url,
      method,
    });
    return await this.exceptionLogRepository.save(log);
  }
}
