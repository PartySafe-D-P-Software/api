import { AggregateRoot } from '@nestjs/cqrs';
import { UserId } from '../values/user-id.value';
import { UserType } from './user-type.enum';
import { Phone } from 'src/shared/domain/values/phone.value';

export class User extends AggregateRoot {
  protected id: UserId;
  protected type: UserType;
  protected phone: Phone;

  public constructor(type: UserType, phone: Phone) {
    super();
    this.type = type;
    this.phone = phone;
  }

  public getId(): UserId {
    return this.id;
  }

  public getType(): UserType {
    return this.type;
  }

  public getPhone(): Phone {
    return this.phone;
  }

  public changeId(id: UserId) {
    this.id = id;
  }

  public changePhone(phone: Phone) {
    this.phone = phone;
  }
}
