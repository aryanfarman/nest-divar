import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;
  @IsString()
  @IsOptional()
  eMail: string;
}
