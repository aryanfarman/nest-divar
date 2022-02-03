import { Module } from '@nestjs/common';
import { AppKeyService } from './app-key.service';
import { AppKeyController } from './app-key.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppKey } from './entities/app-key.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppKey])],
  controllers: [AppKeyController],
  providers: [AppKeyService],
  exports: [AppKeyService],
})
export class AppKeyModule {}
