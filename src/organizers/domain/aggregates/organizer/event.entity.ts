import { AggregateRoot } from '@nestjs/cqrs';
import { MyEventId } from 'src/shared/domain/values/event-id.value';
import { MyEventName } from 'src/shared/domain/values/event-name.value';
import { MyEventRegistered } from '../../events/event-registered.event';

export class MyEvent extends AggregateRoot {
  private id: MyEventId;
  private eventName: MyEventName;
  private description: string;

  public constructor(eventName: MyEventName, description: string) {
    super();
    this.eventName = eventName;
    this.description = description;
  }

  public register() {
    const event = new MyEventRegistered(
      this.id.getValue(),
      this.eventName.getValue(),
      this.description,
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
}
