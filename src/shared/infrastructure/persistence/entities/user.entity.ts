import { UserType } from 'src/shared/domain/entities/user-type.enum';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';
import { PhoneValue } from '../values/phone.value';

@Entity('users')
@TableInheritance({ column: 'type' })
export class UserEntity {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
    name: 'id',
    unsigned: true,
  })
  public id: number;

  @Column({
    name: 'type',
    type: 'enum',
    enum: UserType,
    default: UserType.CLIENT,
  })
  readonly type: UserType;

  @Column((type) => PhoneValue, { prefix: false })
  public phone: PhoneValue;
}
