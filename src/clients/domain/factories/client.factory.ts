import { PersonName } from '../../../shared/domain/values/person-name.value';
import { Client } from '../aggregates/client/client.entity';
import { UserId } from '../../../shared/domain/values/user-id.value';
import { Dni } from '../../../shared/domain/values/dni.value';
import { Phone } from 'src/shared/domain/values/phone.value';

export class ClientFactory {
  public static withId(
    id: UserId,
    name: PersonName,
    dni: Dni,
    phone: Phone,
  ): Client {
    let person: Client = new Client(phone, name, dni);
    person.changeId(id);
    return person;
  }

  public static from(name: PersonName, dni: Dni, phone: Phone): Client {
    return new Client(phone, name, dni);
  }
}
