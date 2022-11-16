import { UserType } from 'src/shared/domain/entities/user-type.enum';
import { ClientRegistered } from 'src/clients/domain/events/client-registered.event';
import { PersonName } from 'src/shared/domain/values/person-name.value';
import { UserId } from '../../../../shared/domain/values/user-id.value';
import { Dni } from 'src/shared/domain/values/dni.value';
import { User } from '../../../../shared/domain/entities/user.root.entity';
import { Phone } from 'src/shared/domain/values/phone.value';

export class Client extends User {
  private name: PersonName;
  private dni: Dni;

  public constructor(phone: Phone, name: PersonName, dni: Dni) {
    super(UserType.CLIENT, phone);
    this.name = name;
    this.dni = dni;
  }

  public register() {
    const event = new ClientRegistered(
      this.id.getValue(),
      this.name.getFirstName(),
      this.name.getLastName(),
      this.dni.getValue(),
    );
    this.apply(event);
  }

  public getId(): UserId {
    return this.id;
  }

  public getName(): PersonName {
    return this.name;
  }

  public getDni(): Dni {
    return this.dni;
  }

  public changeName(name: PersonName): void {
    this.name = name;
  }

  public changeDni(dni: Dni): void {
    this.dni = dni;
  }
}
