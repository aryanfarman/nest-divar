import {
  Column,
  Entity, JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Category } from './category.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  postId: number;
  @Column()
  title: string;
  @Column()
  content: string;
  @Column()
  location: string;
  @JoinTable()
  @ManyToMany((type) => Category, (category) => category.posts, {
    cascade: true,
  })
  categories: Category[];
  @Column({ default: 0 })
  likeCount: number;
  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({
    name: 'userFK',
  })
  userFK: User;
}
