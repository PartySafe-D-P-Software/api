import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { MyEventNameValue } from '../values/event-name.value';

export class MyEventEntity {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
    name: 'id',
    unsigned: true,
  })
  public id: number;

  @Column(() => MyEventNameValue, { prefix: false })
  public myEventName: MyEventNameValue;

  @Column({
    name: 'description',
    type: 'text',
  })
  public description: string;
}
