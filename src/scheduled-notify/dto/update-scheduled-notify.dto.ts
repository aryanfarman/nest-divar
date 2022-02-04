import { PartialType } from '@nestjs/swagger';
import { CreateScheduledNotifyDto } from './create-scheduled-notify.dto';

export class UpdateScheduledNotifyDto extends PartialType(CreateScheduledNotifyDto) {}
