import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async getEventByUser(refId: number, refType: string, userId: number) {
    return await this.eventRepository.findOne({
      where: {
        refId,
        refType,
        userId,
      },
    });
  }
}
