import { Injectable } from '@nestjs/common';
import { CreateAppKeyDto } from './dto/create-app-key.dto';
import { UpdateAppKeyDto } from './dto/update-app-key.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppKey } from './entities/app-key.entity';

@Injectable()
export class AppKeyService {
  constructor(
    @InjectRepository(AppKey)
    private readonly appKeyRepository: Repository<AppKey>,
  ) {}

  create(createAppKeyDto: CreateAppKeyDto) {
    const appKey = this.appKeyRepository.create(createAppKeyDto);
    return this.appKeyRepository.save(appKey);
  }

  findAll() {
    return this.appKeyRepository.find();
  }

  findOne(key: string) {
    return this.appKeyRepository.findOne({ key });
  }

  async update(key: string, updateAppKeyDto: UpdateAppKeyDto) {
    const entity = await this.findOne(key);
    return this.appKeyRepository.preload({
      ...updateAppKeyDto,
      key: entity.key,
    });
  }

  async remove(key: string) {
    const entity = await this.findOne(key);
    return this.appKeyRepository.remove(entity);
  }
}
