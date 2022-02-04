import { Module } from '@nestjs/common';
import { UtilityService } from './utility.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [UtilityService],
  exports: [UtilityService],
})
export class UtilityModule {}
