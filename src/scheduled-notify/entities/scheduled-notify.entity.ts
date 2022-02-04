import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Category } from '../../post/entities/category.entity';

@Entity()
export class ScheduledNotify {
  @PrimaryColumn({
    type: 'int',
  })
  @ManyToOne(() => Category, (category) => category.scheduledNotifies)
  @JoinColumn()
  categoryFK: Category;
  @PrimaryColumn({
    type: 'int',
  })
  @ManyToOne(() => User, (user) => user.scheduledNotifies)
  @JoinColumn()
  userFK: User;
  @Column()
  price: number;
}
