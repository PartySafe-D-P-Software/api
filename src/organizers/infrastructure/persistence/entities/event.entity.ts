import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AddressValue } from '../values/address.value';
import { MyEventNameValue } from '../values/event-name.value';
import { PriceValue } from '../values/price.value';
import { OrganizerEntity } from './organizer.entity';

@Entity('events')
export class MyEventEntity {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
    name: 'id',
    unsigned: true,
  })
  public id: number;

  @Column(() => MyEventNameValue, { prefix: false })
  public myEventName: MyEventNameValue;

  @Column(() => PriceValue, { prefix: false })
  public price: PriceValue;

  @ManyToOne(() => OrganizerEntity, (organizer) => organizer.myEvents)
  @JoinColumn({ referencedColumnName: 'id', name: 'user_id' })
  organizer: OrganizerEntity;

  @Column(() => AddressValue, { prefix: false })
  public address: AddressValue;

  @Column({
    name: 'description',
    type: 'text',
  })
  public description: string;
}
