import { MyEvent } from './event.entity';

export const MYEVENT_REPOSITORY = 'EventRepository';

export interface MyEventRepository {
  create(myEvent: MyEvent): Promise<MyEvent>;
  update(myEvent: MyEvent): Promise<MyEvent>;
  delete(myEventId: number): Promise<boolean>;
  getById(id: number): Promise<MyEvent>;
  getByName(name: string): Promise<MyEvent>;
  getByOrganizerId(organizerId: number): Promise<MyEvent[]>;
  getByPrice(price: number): Promise<MyEvent[]>;
}
