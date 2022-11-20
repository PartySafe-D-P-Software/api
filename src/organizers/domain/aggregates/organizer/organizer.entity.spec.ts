import { LocalName } from 'src/shared/domain/values/local-name.value';
import { Phone } from 'src/shared/domain/values/phone.value';
import { UserId } from 'src/shared/domain/values/user-id.value';
import { OrganizerFactory } from '../../factories/organizer.factory';
import { Organizer } from './organizer.entity';

describe('Organizer', () => {
  let organizer: Organizer;
  let organizerId: UserId;
  let localName: LocalName;
  let phone: Phone;

  beforeEach(() => {
    organizerId = UserId.of(1);
    localName = LocalName.create('OrganizerName');
    phone = Phone.create('999999999');
  });

  describe('register', () => {
    it('should register a new organizer', () => {
      organizer = OrganizerFactory.withId(organizerId, localName, phone);

      expect(organizer.getId()).toEqual(organizerId);
    });
  });
});
