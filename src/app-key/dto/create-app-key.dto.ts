import { PickType } from '@nestjs/swagger';
import { AppKey } from '../entities/app-key.entity';

export class CreateAppKeyDto extends PickType(AppKey, ['name'] as const) {}
