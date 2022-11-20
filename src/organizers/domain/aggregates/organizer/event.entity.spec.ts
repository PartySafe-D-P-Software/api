import { Currency } from 'src/shared/domain/enums/currency.enum';
import { Address } from 'src/shared/domain/values/address.value';
import { MyEventId } from 'src/shared/domain/values/event-id.value';
import { MyEventName } from 'src/shared/domain/values/event-name.value';
import { Money } from 'src/shared/domain/values/money.value';
import { UserId } from 'src/shared/domain/values/user-id.value';
import { MyEventFactory } from '../../factories/event.factory';
import { MyEvent } from './event.entity';

describe('MyEvent', () => {
  let myEvent: MyEvent;
  let myEventId: MyEventId;
  let eventName: MyEventName;
  let description: string;
  let price: Money;
  let userId: UserId;
  let address: Address;

  beforeEach(() => {
    myEventId = MyEventId.of(1);
    eventName = MyEventName.create('MyEventName');
    description = 'MyEventDescription';
    price = Money.create(100, Currency.SOLES);
    userId = UserId.of(1);
    address = Address.create('MyEventAddress');
  });

  describe('register', () => {
    it('should register a new event', () => {
      myEvent = MyEventFactory.withId(
        myEventId,
        eventName,
        description,
        price,
        userId,
        address,
      );

      expect(myEvent.getId()).toEqual(myEventId);
    });
  });
});
