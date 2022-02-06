import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { Post } from './post.entity';
import { ScheduledNotify } from '../../scheduled-notify/entities/scheduled-notify.entity';

@Entity()
export class Category {
  @PrimaryColumn()
  id: number;
  @Column()
  name: string;
  @ManyToMany(() => Post, (post) => post.categories)
  posts: Post[];
  @OneToMany(
    () => ScheduledNotify,
    (scheduledNotify) => scheduledNotify.categoryFK,
  )
  scheduledNotifies: ScheduledNotify[];
}
