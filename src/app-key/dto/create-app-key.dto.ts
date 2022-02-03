import { IsString } from 'class-validator';

export class CreateAppKeyDto {
  @IsString()
  name: string;
}
