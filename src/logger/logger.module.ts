import { DynamicModule, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { PREFIX } from './constants/token.constants';
import { ConsoleColorEnum } from '../enum/console-color.enum';

@Module({})
export class LoggerModule {
  static register(prefix: string, color: ConsoleColorEnum): DynamicModule {
    return {
      module: LoggerModule,
      providers: [
        LoggerService,
        {
          provide: PREFIX,
          useFactory: (loggerService: LoggerService) => {
            return loggerService.set(prefix, color);
          },
          inject: [LoggerService],
        },
      ],
      exports: [LoggerService],
    };
  }
}
