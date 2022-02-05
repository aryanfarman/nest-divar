import { ApiProperty } from '@nestjs/swagger';

export class CreateScheduledNotifyDto {
  @ApiProperty({
    required: true,
  })
  userFK: number;
  @ApiProperty({
    required: true,
  })
  categoryFK: number;
  @ApiProperty({
    required: true,
  })
  price: string;
  @ApiProperty({
    required: false,
  })
  kilometer: number;
}
