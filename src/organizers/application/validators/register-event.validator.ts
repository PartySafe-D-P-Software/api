import { Inject, Injectable } from '@nestjs/common';
import { MyEvent } from 'src/organizers/domain/aggregates/organizer/event.entity';
import {
  MyEventRepository,
  MYEVENT_REPOSITORY,
} from 'src/organizers/domain/aggregates/organizer/event.repository';
import { AppNotification } from 'src/shared/application/app.notification';
import { RegisterMyEvent } from '../messages/commands/register-event.command';

@Injectable()
export class RegisterMyEventValidator {
  constructor(
    @Inject(MYEVENT_REPOSITORY)
    private myEventRepository: MyEventRepository,
  ) {}

  public async validate(
    registerMyEvent: RegisterMyEvent,
  ): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const myEventName: string = registerMyEvent.myEventName.trim();
    if (myEventName.length <= 0) {
      notification.addError('myEventName is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    let myEvent: MyEvent = await this.myEventRepository.getByName(myEventName);
    if (myEvent != null) notification.addError('myEventName is taken', null);
    return notification;
  }
}
