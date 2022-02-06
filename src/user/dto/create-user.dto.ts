import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;
  @IsString()
  username: string;
  @IsString()
  eMail: string;
  @IsString()
  password: string;
  @IsString()
  confirmPassword: string;
}
