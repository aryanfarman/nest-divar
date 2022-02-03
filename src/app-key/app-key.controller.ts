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

@Controller('app-key')
@IsAdmin()
export class AppKeyController {
  constructor(private readonly appKeyService: AppKeyService) {}

  @Post()
  async create(@Body() createAppKeyDto: CreateAppKeyDto) {
    return await this.appKeyService.create(createAppKeyDto);
  }

  @Get()
  findAll() {
    return this.appKeyService.findAll();
  }

  @Get(':key')
  findOne(@Param('key') key: string) {
    return this.appKeyService.findOne(key);
  }

  @Patch(':key')
  update(@Param('key') key: string, @Body() updateAppKeyDto: UpdateAppKeyDto) {
    return this.appKeyService.update(key, updateAppKeyDto);
  }

  @Delete(':key')
  remove(@Param('key') key: string) {
    return this.appKeyService.remove(key);
  }
}
