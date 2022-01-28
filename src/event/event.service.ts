import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefTypeEnum } from '../enum/ref-type.enum';
import { EventEntity, EventTypeEnum } from './entities/event.entity';
import { LOG } from '../logger/constants/token.constants';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
    @Inject(LOG + 'event') private readonly log,
  ) {
    this.log('hi from event');
  }

  async getEventByUser(
    refID: number,
    refType: RefTypeEnum,
    userId: number,
    type: EventTypeEnum,
  ) {
    return await this.eventRepository.findOne({
      where: {
        refID: refID,
        refType: refType,
        message: type,
        user: userId,
      },
    });
  }
}
