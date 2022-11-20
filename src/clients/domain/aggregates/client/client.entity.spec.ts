import { Dni } from 'src/shared/domain/values/dni.value';
import { PersonName } from 'src/shared/domain/values/person-name.value';
import { Phone } from 'src/shared/domain/values/phone.value';
import { UserId } from 'src/shared/domain/values/user-id.value';
import { ClientFactory } from '../../factories/client.factory';
import { Client } from './client.entity';

describe('Client', () => {
  let client: Client;
  let clientId: UserId;
  let name: PersonName;
  let phone: Phone;
  let dni: Dni;

  beforeEach(() => {
    clientId = UserId.of(1);
    name = PersonName.create('ClientName', 'ClientLastName');
    phone = Phone.create('999999999');
    dni = Dni.create('99999999');
  });

  describe('register', () => {
    it('should register a new organizer', () => {
      client = ClientFactory.withId(clientId, name, dni, phone);

      expect(client.getId()).toEqual(clientId);
    });
  });
});
