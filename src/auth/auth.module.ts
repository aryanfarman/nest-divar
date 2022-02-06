import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UtilityModule } from '../utility/utility.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { LocalStrategy } from './strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [UtilityModule, TypeOrmModule.forFeature([User]), PassportModule],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
