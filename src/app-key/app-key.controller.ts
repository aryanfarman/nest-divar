import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AppKeyService } from './app-key.service';
import { CreateAppKeyDto } from './dto/create-app-key.dto';
import { UpdateAppKeyDto } from './dto/update-app-key.dto';
import { IsAdmin } from '../common/guards/isAdmin-decortor';
import {
  ApiBadRequestResponse,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Application Keys Controller For Admin')
@ApiHeader({
  name: 'admin-key',
  description: 'this is a private route only accessible with valid admin key',
  required: true,
})
@Controller('app-key')
@IsAdmin()
export class AppKeyController {
  constructor(private readonly appKeyService: AppKeyService) {}

  @ApiBadRequestResponse({
    description: 'this a private route you have to set admin-key in headers',
  })
  @ApiOperation({
    description:
      'insert a name for generating an app key for a user!\n its generate an uuid !\n dont forgot to set admin-key in header',
  })
  @Post()
  async create(@Body() createAppKeyDto: CreateAppKeyDto) {
    return await this.appKeyService.create(createAppKeyDto);
  }

  @ApiBadRequestResponse({
    description: 'this a private route you have to set admin-key in headers',
  })
  @ApiOperation({
    description:
      'get list of app keys\n dont forgot to set admin-key in header',
  })
  @Get()
  findAll() {
    return this.appKeyService.findAll();
  }

  @ApiBadRequestResponse({
    description: 'this a private route you have to set admin-key in headers',
  })
  @ApiOperation({
    description:
      'get specific app key details\n dont forgot to set admin-key in header',
  })
  @Get(':key')
  findOne(@Param('key') key: string) {
    return this.appKeyService.findOne(key);
  }

  @ApiBadRequestResponse({
    description: 'this a private route you have to set admin-key in headers',
  })
  @ApiOperation({
    description:
      'update name of a owner of a app key\n dont forgot to set admin-key in header',
  })
  @Patch(':key')
  update(@Param('key') key: string, @Body() updateAppKeyDto: UpdateAppKeyDto) {
    return this.appKeyService.update(key, updateAppKeyDto);
  }

  @ApiBadRequestResponse({
    description: 'this a private route you have to set admin-key in headers',
  })
  @ApiOperation({
    description:
      'delete an app key with uuid\n dont forgot to set admin-key in header',
  })
  @Delete(':key')
  remove(@Param('key') key: string) {
    return this.appKeyService.remove(key);
  }
}
