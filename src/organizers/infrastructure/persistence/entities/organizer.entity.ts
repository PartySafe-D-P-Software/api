import { UserEntity } from 'src/shared/infrastructure/persistence/entities/user.entity';
import { ChildEntity, Column } from 'typeorm';
import { UserType } from 'src/shared/domain/entities/user-type.enum';
import { LocalNameValue } from 'src/organizers/infrastructure/persistence/values/local-name.value';

@ChildEntity(UserType.ORGANIZER)
export class OrganizerEntity extends UserEntity {
  @Column((type) => LocalNameValue, { prefix: false })
  public companyName: LocalNameValue;
}
