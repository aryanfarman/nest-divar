import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UtilityModule } from '../utility/utility.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalStrategy } from './strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserRepository } from '../repositories/user.repository';

@Module({
  imports: [
    UtilityModule,
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule,
  ],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
