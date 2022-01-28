import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from '../post/post.module';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { EventModule } from '../event/event.module';
import { UtilityModule } from '../utility/utility.module';
import { CurrencyModule } from '../currency/currency.module';
import { LoggerModule } from '../logger/logger.module';
import appConfig from './config/app.config';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT: Joi.number().default(1433),
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
