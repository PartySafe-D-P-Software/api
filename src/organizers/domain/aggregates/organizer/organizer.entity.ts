import { UserId } from '../../../../shared/domain/values/user-id.value';
import { User } from '../../../../shared/domain/entities/user.root.entity';
import { LocalName } from 'src/shared/domain/values/local-name.value';
import { UserType } from 'src/shared/domain/entities/user-type.enum';
import { OrganizerRegistered } from 'src/organizers/domain/events/organizer-registered.event';
import { Phone } from 'src/shared/domain/values/phone.value';

export class Organizer extends User {
  private localName: LocalName;

  public constructor(phone: Phone, localName: LocalName) {
    super(UserType.ORGANIZER, phone);
    this.localName = localName;
  }

  public register() {
    const event = new OrganizerRegistered(
      this.id.getValue(),
      this.localName.getValue(),
    );
    this.apply(event);
  }

  public getId(): UserId {
    return this.id;
  }

  public getLocalName(): LocalName {
    return this.localName;
  }

  public changeLocalName(localName: LocalName): void {
    this.localName = localName;
  }
}
