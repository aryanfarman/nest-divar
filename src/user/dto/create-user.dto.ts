import { IsOptional, IsString } from 'class-validator';
import { PickType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class CreateUserDto extends PickType(User, ['name', 'eMail'] as const) {
  @IsString()
  name: string;
  @IsString()
  @IsOptional()
  eMail: string;
}
