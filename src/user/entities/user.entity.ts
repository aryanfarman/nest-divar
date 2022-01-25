import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../../post/entities/post.entity';

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
  //relation between user and post
  @OneToMany(() => Post, (post) => post.userFK)
  posts: Post[];
}
