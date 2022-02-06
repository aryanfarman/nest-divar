import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateScheduledNotifyDto {
  @ApiProperty({
    required: true,
  })
  @IsNumber()
  userFK: number;
  @ApiProperty({
    required: true,
  })
  @IsNumber()
  categoryFK: number;
  @ApiProperty({
    required: true,
  })
  @IsString()
  price: string;
  @ApiProperty({
    required: false,
  })
  @IsNumber()
  @IsOptional()
  kilometer: number;
}
