import { PartialType } from '@nestjs/swagger';
import { CreateAppKeyDto } from './create-app-key.dto';

export class UpdateAppKeyDto extends PartialType(CreateAppKeyDto) {}
