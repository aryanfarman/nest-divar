import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../../post/entities/post.entity';
import { EventEntity } from '../../event/entities/event.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({
    nullable: true,
  })
  eMail: string;
  @OneToMany(() => Post, (post) => post.userFK)
  posts: Post[];
  @OneToMany(() => EventEntity, (event) => event.user)
  events: EventEntity[];
}
