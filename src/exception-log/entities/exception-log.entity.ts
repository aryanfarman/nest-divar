import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ExceptionLog {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  message: string;
  @Column()
  status: number;
  @Column()
  creationTime: Date;
}
