import { AggregateRoot } from '@nestjs/cqrs';
import { Address } from 'src/shared/domain/values/address.value';
import { MyEventId } from 'src/shared/domain/values/event-id.value';
import { MyEventName } from 'src/shared/domain/values/event-name.value';
import { Money } from 'src/shared/domain/values/money.value';
import { UserId } from 'src/shared/domain/values/user-id.value';
import { MyEventRegistered } from '../../events/event-registered.event';

export class MyEvent extends AggregateRoot {
  private id: MyEventId;
  private eventName: MyEventName;
  private description: string;
  private price: Money;
  private userId: UserId;
  private address: Address;

  public constructor(
    eventName: MyEventName,
    description: string,
    price: Money,
    userId: UserId,
    address: Address,
  ) {
    super();
    this.eventName = eventName;
    this.description = description;
    this.price = price;
    this.userId = userId;
    this.address = address;
  }

  public register() {
    const event = new MyEventRegistered(
      this.id.getValue(),
      this.eventName.getValue(),
      this.description,
      this.price.getAmount(),
      this.userId.getValue(),
      this.address.getValue(),
    );
    this.apply(event);
  }

  public getId(): MyEventId {
    return this.id;
  }

  public changeId(id: MyEventId): void {
    this.id = id;
  }

  public getMyEventName(): MyEventName {
    return this.eventName;
  }

  public changeMyEventName(eventName: MyEventName): void {
    this.eventName = eventName;
  }

  public getDescription(): string {
    return this.description;
  }

  public changeDescription(description: string): void {
    this.description = description;
  }

  public getPrice(): Money {
    return this.price;
  }

  public changePrice(price: Money): void {
    this.price = price;
  }

  public getUserId(): UserId {
    return this.userId;
  }

  public changeUserId(userId: UserId): void {
    this.userId = userId;
  }

  public getAddress(): Address {
    return this.address;
  }

  public changeAddress(address: Address): void {
    this.address = address;
  }
}
