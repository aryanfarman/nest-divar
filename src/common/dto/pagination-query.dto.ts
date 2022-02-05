import { ApiProperty } from '@nestjs/swagger';

export class PaginationQueryDto {
  @ApiProperty({
    nullable: true,
    required: false,
    minimum: 0,
  })
  limit: number;
  @ApiProperty({
    nullable: true,
    required: false,
    minimum: 0,
  })
  offset: number;
}
