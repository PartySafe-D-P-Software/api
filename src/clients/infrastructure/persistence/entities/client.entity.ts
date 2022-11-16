import { UserType } from 'src/shared/domain/entities/user-type.enum';
import { UserEntity } from 'src/shared/infrastructure/persistence/entities/user.entity';
import { PersonNameValue } from 'src/clients/infrastructure/persistence/values/person-name.value';
import { ChildEntity, Column } from 'typeorm';
import { DniValue } from '../values/dni.value';

@ChildEntity(UserType.CLIENT)
export class ClientEntity extends UserEntity {
  @Column((type) => PersonNameValue, { prefix: false })
  public name: PersonNameValue;

  @Column((type) => DniValue, { prefix: false })
  public dni: DniValue;
}
