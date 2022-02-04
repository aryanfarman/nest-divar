import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Category } from '../../post/entities/category.entity';

@Entity()
export class ScheduledNotify {
  @PrimaryGeneratedColumn()
  id: string;
  @ManyToOne(() => Category, (category) => category.scheduledNotifies)
  @JoinColumn()
  categoryFK: Category;
  @ManyToOne(() => User, (user) => user.scheduledNotifies)
  @JoinColumn()
  userFK: User;
  @Column()
  price: number;
  @Column({
    default: 5000000,
  })
  kilometer: number;
}
