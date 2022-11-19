import { MyEventId } from 'src/shared/domain/values/event-id.value';
import { MyEventName } from 'src/shared/domain/values/event-name.value';
import { MyEvent } from '../aggregates/organizer/event.entity';

export class MyEventFactory {
  public static withId(
    id: MyEventId,
    eventName: MyEventName,
    description: string,
  ): MyEvent {
    let myEvent: MyEvent = new MyEvent(eventName, description);
    myEvent.changeId(id);
    return myEvent;
  }

  public static from(name: MyEventName, description: string): MyEvent {
    return new MyEvent(name, description);
  }
}
