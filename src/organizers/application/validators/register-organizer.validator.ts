import { Inject, Injectable } from '@nestjs/common';
import { Organizer } from 'src/organizers/domain/aggregates/organizer/organizer.entity';
import {
  OrganizerRepository,
  ORGANIZER_REPOSITORY,
} from 'src/organizers/domain/aggregates/organizer/organizer.repository';
import { AppNotification } from 'src/shared/application/app.notification';
import { RegisterOrganizer } from '../messages/commands/register-organizer.command';

@Injectable()
export class RegisterOrganizerValidator {
  constructor(
    @Inject(ORGANIZER_REPOSITORY)
    private organizerRepository: OrganizerRepository,
  ) {}

  public async validate(
    registerOrganizer: RegisterOrganizer,
  ): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const localName: string = registerOrganizer.localName.trim();
    if (localName.length <= 0) {
      notification.addError('localName is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    let company: Organizer = await this.organizerRepository.getByLocalName(
      localName,
    );
    if (company != null) {
      notification.addError('localName is taken', null);
      return notification;
    }
    return notification;
  }
}
