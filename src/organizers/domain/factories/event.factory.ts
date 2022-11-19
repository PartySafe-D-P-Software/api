import { Address } from 'src/shared/domain/values/address.value';
import { MyEventId } from 'src/shared/domain/values/event-id.value';
import { MyEventName } from 'src/shared/domain/values/event-name.value';
import { Money } from 'src/shared/domain/values/money.value';
import { UserId } from 'src/shared/domain/values/user-id.value';
import { MyEvent } from '../aggregates/organizer/event.entity';

export class MyEventFactory {
  public static withId(
    id: MyEventId,
    eventName: MyEventName,
    description: string,
    price: Money,
    userId: UserId,
    address: Address,
  ): MyEvent {
    let myEvent: MyEvent = new MyEvent(
      eventName,
      description,
      price,
      userId,
      address,
    );
    myEvent.changeId(id);
    return myEvent;
  }

  public static from(
    name: MyEventName,
    description: string,
    price: Money,
    userId: UserId,
    address: Address,
  ): MyEvent {
    return new MyEvent(name, description, price, userId, address);
  }
}
