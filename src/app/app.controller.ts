import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsPublic } from '../common/guards/isPublic-decorator';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    description: 'get home page from this route!',
  })
  @IsPublic()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
