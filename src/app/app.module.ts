import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from '../post/post.module';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { EventModule } from '../event/event.module';
import { UtilityModule } from '../utility/utility.module';
import { CurrencyModule } from '../currency/currency.module';
import { LoggerModule } from '../logger/logger.module';
import appConfig from './config/app.config';
import * as Joi from '@hapi/joi';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { LogExceptionFilter } from '../common/filters/log-exception.filter';
import { ExceptionLogModule } from '../exception-log/exception-log.module';
import { AppKeyGuard } from '../common/guards/app-key.guard';
import { AppKeyModule } from '../app-key/app-key.module';
import { ResponseWrapperInterceptor } from '../common/interceptors/response-wrapper.interceptor';

@Module({
  imports: [
    ExceptionLogModule,
    ConfigModule.forRoot({
      load: [appConfig],
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().default(1433),
        DATABASE_USERNAME: Joi.string().required(),
        VALIDATION_WHITELIST: Joi.boolean().required(),
        VALIDATION_FORBID_NON_WHITE_LISTED: Joi.boolean().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(appConfig)],
      useFactory: (app: ConfigType<typeof appConfig>) => ({
        type: 'mssql',
        ...app.database,
        database: 'divar',
      }),
      inject: [appConfig.KEY],
    }),
    PostModule,
    UserModule,
    EventModule,
    UtilityModule,
    CurrencyModule,
    LoggerModule,
    AppKeyModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseWrapperInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: LogExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AppKeyGuard,
    },
    {
      provide: APP_PIPE,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return new ValidationPipe({
          whitelist: configService.get('VALIDATION_WHITELIST'),
          transform: configService.get('VALIDATION_FORBID_NON_WHITE_LISTED'),
          forbidNonWhitelisted: true,
          transformOptions: {
            enableImplicitConversion: true,
          },
        });
      },
    },
  ],
})
export class AppModule {}
