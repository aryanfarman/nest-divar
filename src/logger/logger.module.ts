import { DynamicModule, Module, Scope } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { ConsoleColorEnum } from '../enum/console-color.enum';
import { LOG } from './constants/token.constants';

@Module({})
export class LoggerModule {
  static register(prefix: string, color: ConsoleColorEnum): DynamicModule {
    console.log('inside register:', prefix, color);
    return {
      module: LoggerModule,
      providers: [
        LoggerService,
        {
          scope: Scope.TRANSIENT,
          provide: LOG,
          useFactory: (loggerService: LoggerService) => {
            console.log('inside useFactory:', prefix, color);

            return loggerService.set(prefix, color);
          },
          inject: [LoggerService],
        },
      ],
      exports: [LOG],
    };
  }
}
