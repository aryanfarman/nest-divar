import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
export enum EventType {
  Liked = 'LIKED',
  Commented = 'COMMENTED',
}

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'nvarchar',
    length: 20,
  })
  message: EventType;
  @Column()
  refType: string;
  @Column()
  refID: number;
  @Column()
  userFK: number;
}
