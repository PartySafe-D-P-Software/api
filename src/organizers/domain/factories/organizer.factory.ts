import { Phone } from 'src/shared/domain/values/phone.value';
import { LocalName } from '../../../shared/domain/values/local-name.value';
import { Organizer } from '../aggregates/organizer/organizer.entity';
import { UserId } from '../../../shared/domain/values/user-id.value';

export class OrganizerFactory {
  public static withId(id: UserId, name: LocalName, phone: Phone): Organizer {
    let organizer: Organizer = new Organizer(phone, name);
    organizer.changeId(id);
    return organizer;
  }

  public static from(name: LocalName, phone: Phone): Organizer {
    return new Organizer(phone, name);
  }
}
