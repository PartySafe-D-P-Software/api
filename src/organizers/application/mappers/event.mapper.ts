import { MyEvent } from 'src/organizers/domain/aggregates/organizer/event.entity';
import { MyEventFactory } from 'src/organizers/domain/factories/event.factory';
import { MyEventEntity } from 'src/organizers/infrastructure/persistence/entities/event.entity';
import { MyEventNameValue } from 'src/organizers/infrastructure/persistence/values/event-name.value';
import { Currency } from 'src/shared/domain/enums/currency.enum';
import { Address } from 'src/shared/domain/values/address.value';
import { MyEventId } from 'src/shared/domain/values/event-id.value';
import { MyEventName } from 'src/shared/domain/values/event-name.value';
import { Money } from 'src/shared/domain/values/money.value';
import { UserId } from 'src/shared/domain/values/user-id.value';
import { MyEventDto } from '../dtos/event.dto';
import { RegisterMyEventRequest } from '../dtos/register-event-request.dto';
import { RegisterMyEventResponse } from '../dtos/register-event-response.dto';
import { RegisterMyEvent } from '../messages/commands/register-event.command';

export class MyEventMapper {
  public static dtoRequestToCommand(
    registerMyEventRequest: RegisterMyEventRequest,
  ): RegisterMyEvent {
    return new RegisterMyEvent(
      registerMyEventRequest.myEventName,
      registerMyEventRequest.description,
      registerMyEventRequest.price,
      registerMyEventRequest.userId,
      registerMyEventRequest.address,
    );
  }

  public static domainToDtoResponse(myEvent: MyEvent): RegisterMyEventResponse {
    return new RegisterMyEventResponse(
      myEvent.getId().getValue(),
      myEvent.getMyEventName().getValue(),
      myEvent.getDescription(),
      myEvent.getPrice().getAmount(),
      myEvent.getUserId().getValue(),
      myEvent.getAddress().getValue(),
    );
  }

  public static commandToDomain(command: RegisterMyEvent): MyEvent {
    const myEventName: MyEventName = MyEventName.create(command.myEventName);
    const description: string = command.description;
    const price: Money = Money.create(command.price, Currency.SOLES);
    const userId: UserId = UserId.of(command.userId);
    const address: Address = Address.create(command.address);
    let myEvent: MyEvent = MyEventFactory.from(
      myEventName,
      description,
      price,
      userId,
      address,
    );
    return myEvent;
  }

  public static domainToEntity(myEvent: MyEvent): MyEventEntity {
    const myEventEntity: MyEventEntity = new MyEventEntity();
    myEventEntity.myEventName = MyEventNameValue.from(
      myEvent.getMyEventName().getValue(),
    );
    myEventEntity.description = myEvent.getDescription();
    return myEventEntity;
  }

  public static entityToDomain(myEventEntity: MyEventEntity): MyEvent {
    if (myEventEntity == null) return null;
    const myEventName: MyEventName = MyEventName.create(
      myEventEntity.myEventName.value,
    );
    const description: string = myEventEntity.description;
    const myEventId: MyEventId = MyEventId.of(myEventEntity.id);
    const price: Money = Money.create(
      myEventEntity.price.amount,
      Currency.SOLES,
    );
    const userId: UserId = UserId.of(myEventEntity.organizer.id);
    const address: Address = Address.create(myEventEntity.address.value);

    let myEvent: MyEvent = MyEventFactory.withId(
      myEventId,
      myEventName,
      description,
      price,
      userId,
      address,
    );
    return myEvent;
  }

  public static ormToMyEventDto(row: any): MyEventDto {
    let dto = new MyEventDto();
    dto.id = Number(row.id);
    dto.myEventName = row.myEventName;
    dto.description = row.description;
    dto.price = row.price;
    dto.userId = row.userId;
    dto.address = row.address;
    return dto;
  }
}
