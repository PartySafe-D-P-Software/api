import { Organizer } from 'src/organizers/domain/aggregates/organizer/organizer.entity';
import { OrganizerFactory } from 'src/organizers/domain/factories/organizer.factory';
import { OrganizerEntity } from 'src/organizers/infrastructure/persistence/entities/organizer.entity';
import { LocalNameValue } from 'src/organizers/infrastructure/persistence/values/local-name.value';
import { LocalName } from 'src/shared/domain/values/local-name.value';
import { Phone } from 'src/shared/domain/values/phone.value';
import { UserId } from 'src/shared/domain/values/user-id.value';
import { PhoneValue } from 'src/shared/infrastructure/persistence/values/phone.value';
import { OrganizerUserDto } from '../dtos/organizer-user.dto';
import { RegisterOrganizerRequest } from '../dtos/register-organizer-request.dto';
import { RegisterOrganizerResponse } from '../dtos/register-organizer-response.dto';
import { RegisterOrganizer } from '../messages/commands/register-organizer.command';

export class OrganizerMapper {
  public static dtoRequestToCommand(
    registerOrganizerRequest: RegisterOrganizerRequest,
  ): RegisterOrganizer {
    return new RegisterOrganizer(
      registerOrganizerRequest.localName,
      registerOrganizerRequest.phone,
    );
  }

  public static domainToDtoResponse(
    organizer: Organizer,
  ): RegisterOrganizerResponse {
    return new RegisterOrganizerResponse(
      organizer.getId().getValue(),
      organizer.getLocalName().getValue(),
      organizer.getPhone().getValue(),
    );
  }

  public static commandToDomain(command: RegisterOrganizer): Organizer {
    const localName: LocalName = LocalName.create(command.localName);
    const phone: Phone = Phone.create(command.phone);
    let organizer: Organizer = OrganizerFactory.from(localName, phone);
    return organizer;
  }

  public static domainToEntity(organizer: Organizer): OrganizerEntity {
    const organizerEntity: OrganizerEntity = new OrganizerEntity();
    organizerEntity.localName = LocalNameValue.from(
      organizer.getLocalName().getValue(),
    );
    organizerEntity.phone = PhoneValue.from(organizer.getPhone().getValue());
    return organizerEntity;
  }

  public static entityToDomain(organizerEntity: OrganizerEntity): Organizer {
    if (organizerEntity == null) return null;
    const localName: LocalName = LocalName.create(
      organizerEntity.localName.value,
    );
    const phone: Phone = Phone.create(organizerEntity.phone.value);
    const userId: UserId = UserId.of(organizerEntity.id);
    let organizer: Organizer = OrganizerFactory.withId(
      userId,
      localName,
      phone,
    );
    return organizer;
  }

  public static ormToOrganizerUserDto(row: any): OrganizerUserDto {
    let dto = new OrganizerUserDto();
    dto.id = Number(row.id);
    dto.localName = row.localName;
    dto.phone = row.phone;
    return dto;
  }
}
