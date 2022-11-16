import { Client } from 'src/clients/domain/aggregates/client/client.entity';
import { ClientFactory } from 'src/clients/domain/factories/client.factory';
import { ClientEntity } from 'src/clients/infrastructure/persistence/entities/client.entity';
import { DniValue } from 'src/clients/infrastructure/persistence/values/dni.value';
import { PersonNameValue } from 'src/clients/infrastructure/persistence/values/person-name.value';
import { Dni } from 'src/shared/domain/values/dni.value';
import { PersonName } from 'src/shared/domain/values/person-name.value';
import { Phone } from 'src/shared/domain/values/phone.value';
import { UserId } from 'src/shared/domain/values/user-id.value';
import { PhoneValue } from 'src/shared/infrastructure/persistence/values/phone.value';
import { ClientUserDto } from '../dtos/client-user.dto';
import { RegisterClientRequest } from '../dtos/register-client-request.dto';
import { RegisterClientResponse } from '../dtos/register-client-response.dto';
import { RegisterClient } from '../messages/commands/register-client.command';

export class ClientMapper {
  public static dtoRequestToCommand(
    registerClientRequest: RegisterClientRequest,
  ) {
    return new RegisterClient(
      registerClientRequest.firstName,
      registerClientRequest.lastName,
      registerClientRequest.dni,
      registerClientRequest.phone,
    );
  }

  public static domainToDtoResponse(client: Client) {
    return new RegisterClientResponse(
      client.getId().getValue(),
      client.getName().getFirstName(),
      client.getName().getLastName(),
      client.getDni().getValue(),
      client.getPhone().getValue(),
    );
  }

  public static commandToDomain(command: RegisterClient): Client {
    const personName: PersonName = PersonName.create(
      command.firstName,
      command.lastName,
    );
    const dni: Dni = Dni.create(command.dni);
    const phone: Phone = Phone.create(command.phone);
    let client: Client = ClientFactory.from(personName, dni, phone);
    return client;
  }

  public static domainToEntity(client: Client): ClientEntity {
    const clientEntity: ClientEntity = new ClientEntity();
    clientEntity.name = PersonNameValue.from(
      client.getName().getFirstName(),
      client.getName().getLastName(),
    );
    clientEntity.id = client.getId().getValue();
    clientEntity.dni = DniValue.from(client.getDni().getValue());
    clientEntity.phone = PhoneValue.from(client.getPhone().getValue());
    return clientEntity;
  }

  public static entityToDomain(clientEntity: ClientEntity): Client {
    if (clientEntity == null) return null;
    const personName: PersonName = PersonName.create(
      clientEntity.name.firstName,
      clientEntity.name.lastName,
    );
    const dni: Dni = Dni.create(clientEntity.dni.value);
    const phone: Phone = Phone.create(clientEntity.phone.value);
    const userId: UserId = UserId.of(clientEntity.id);
    let client: Client = ClientFactory.withId(userId, personName, dni, phone);
    return client;
  }

  public static ormToClientUserDto(row: any): ClientUserDto {
    let dto = new ClientUserDto();
    dto.id = Number(row.id);
    dto.firstName = row.firstName;
    dto.lastName = row.lastName;
    dto.dni = row.dni;
    return dto;
  }
}
