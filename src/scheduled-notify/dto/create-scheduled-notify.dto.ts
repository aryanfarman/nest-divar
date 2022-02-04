import { IsNumber, IsOptional } from 'class-validator';

export class CreateScheduledNotifyDto {
  @IsNumber()
  userFK: number;
  @IsNumber()
  categoryFK: number;
  @IsNumber()
  price: number;
  @IsOptional()
  @IsNumber()
  kilometer: number;
}
