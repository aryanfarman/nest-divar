import { EntityRepository, Repository } from 'typeorm';
import { RefTypeEnum } from '../enum/ref-type.enum';
import { EventEntity, EventTypeEnum } from './entities/event.entity';
import { Post } from '../post/entities/post.entity';

@EntityRepository(EventEntity)
export class EventRepository extends Repository<EventEntity> {
  async getEventByUser(
    refID: number,
    refType: RefTypeEnum,
    userId: number,
    type: EventTypeEnum,
  ) {
    return await this.findOne({
      where: {
        refID: refID,
        refType: refType,
        message: type,
        user: userId,
      },
    });
  }

  createEvent(type: EventTypeEnum, post: Post) {
    return this.create({
      message: type,
      refID: post.postId,
      refType: RefTypeEnum.Post,
    });
  }
}
