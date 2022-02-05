import { Controller, Get, Param, Post, Query, UsePipes } from '@nestjs/common';
import { ScheduledNotifyService } from './scheduled-notify.service';
import { CreateScheduledNotifyDto } from './dto/create-scheduled-notify.dto';
import { MoneyPipe } from '../common/pipes/money-pipe.pipe';
import {
  ApiBadRequestResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiHeader({
  name: 'x-app-key',
  description: 'this a monetize route you have to set x-app-key in headers',
  required: true,
})
@ApiTags('Scheduled Notification')
@Controller('scheduled-notify')
export class ScheduledNotifyController {
  constructor(
    private readonly scheduledNotifyService: ScheduledNotifyService,
  ) {}

  @ApiNotFoundResponse({
    description: 'only existed user and existed category ids are valid! ',
  })
  @ApiBadRequestResponse({
    description: 'this a monetize route you have to set x-app-key in headers',
  })
  @ApiOperation({
    description: `it submit a request in api and will return that request
    you can filter on price its required and kilometer is optional
    remember you can set money in query with dollar or euro or rial sign or without any sign
    you can separate numbers with comma for higher readability we also handled this
    we change it to toman anyway`,
  })
  @Post()
  @UsePipes(MoneyPipe)
  create(
    @Query()
    createScheduledNotifyDto: CreateScheduledNotifyDto,
  ) {
    return this.scheduledNotifyService.create(createScheduledNotifyDto);
  }

  @ApiBadRequestResponse({
    description: 'this a monetize route you have to set x-app-key in headers',
  })
  @ApiOperation({
    description: 'this find all requests are submitted in app',
  })
  @Get()
  findAll() {
    return this.scheduledNotifyService.findAll();
  }

  @ApiNotFoundResponse({
    description: 'only existed request ids are valid! ',
  })
  @ApiBadRequestResponse({
    description: 'this a monetize route you have to set x-app-key in headers',
  })
  @ApiOperation({
    description: 'this find one valid request is submitted in app',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scheduledNotifyService.findOne(+id);
  }
}
