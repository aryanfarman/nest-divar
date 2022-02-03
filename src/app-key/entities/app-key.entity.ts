import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AppKey {
  @PrimaryGeneratedColumn('uuid')
  key: string;
  @Column()
  name: string;
}
