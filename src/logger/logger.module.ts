import { DynamicModule, Module, Scope } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { ConsoleColorEnum } from '../enum/console-color.enum';
import { LOG } from './constants/token.constants';

@Module({})
export class LoggerModule {
  static register(prefix: string, color: ConsoleColorEnum): DynamicModule {
    return {
      module: LoggerModule,
      providers: [
        LoggerService,
        {
          scope: Scope.TRANSIENT,
          provide: LOG + prefix,
          useFactory: (loggerService) => {
            return loggerService.set(prefix, color);
          },
          inject: [LoggerService],
        },
      ],
      exports: [LOG + prefix, LoggerService],
    };
  }
}
