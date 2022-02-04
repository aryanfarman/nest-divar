import { Module } from '@nestjs/common';
import { ScheduledNotifyService } from './scheduled-notify.service';
import { HttpModule } from '@nestjs/axios';
import { ScheduledNotifyController } from './scheduled-notify.controller';

@Module({
  imports: [HttpModule],
  providers: [ScheduledNotifyService],
  controllers: [ScheduledNotifyController],
})
export class ScheduledNotifyModule {
  // static register(): DynamicModule {
  //   return {
  //     module: ScheduledNotify,
  //     imports: [
  //       TypeOrmModule.forFeature([ScheduledNotify]),
  //       HttpModule.registerAsync({
  //         imports: [ConfigModule],
  //         useFactory: async (
  //           configService: ConfigService,
  //           httpService: HttpService,
  //         ) => {
  //           const api = await httpService.get('https://divar.ir/s/mashhad/car');
  //           console.log(api);
  //
  //           return {
  //             timeout: configService.get('HTTP_TIMEOUT'),
  //             maxRedirects: configService.get('HTTP_MAX_REDIRECTS'),
  //           };
  //         },
  //         inject: [ConfigService, HttpService],
  //       }),
  //     ],
  //     providers: [ScheduledNotifyService],
  //   };
  // }
}
