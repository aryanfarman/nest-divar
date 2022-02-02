import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ExceptionLog')
export class ExceptionLog {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  message: string;
  @Column()
  status: number;
  @Column()
  creationTime: string = new Date().toString();
  @Column()
  url: string;
  @Column()
  method: string;
}
