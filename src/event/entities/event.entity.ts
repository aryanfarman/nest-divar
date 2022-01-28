import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { RefTypeEnum } from '../../enum/ref-type.enum';

export enum EventTypeEnum {
  Liked = 'LIKED',
  Commented = 'COMMENTED',
}

@Entity('event')
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'nvarchar',
    length: 20,
  })
  message: EventTypeEnum;
  @Column()
  refType: RefTypeEnum;
  @Column()
  refID: number;
  @ManyToOne(() => User, (user) => user.events)
  @JoinColumn()
  user: User;
}
