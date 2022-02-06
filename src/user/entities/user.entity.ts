import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../../post/entities/post.entity';
import { EventEntity } from '../../event/entities/event.entity';
import { ScheduledNotify } from '../../scheduled-notify/entities/scheduled-notify.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({
    unique: true,
  })
  username: string;
  @Column()
  @Exclude()
  password: string;
  @Column({
    nullable: true,
  })
  eMail: string;
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
  @OneToMany(() => EventEntity, (event) => event.user)
  events: EventEntity[];
  @OneToMany(() => ScheduledNotify, (scheduledNotify) => scheduledNotify.userFK)
  scheduledNotifies: ScheduledNotify[];
}
