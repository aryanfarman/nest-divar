import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateScheduledNotifyDto {
  @IsNumber()
  userFK: number;
  @IsNumber()
  categoryFK: number;
  @IsString()
  price: string;
  @IsOptional()
  @IsNumber()
  kilometer: number;
}
