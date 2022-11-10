import { Column } from 'typeorm';

export class PhoneValue {
  @Column('varchar', { name: 'phone', length: 9, nullable: true })
  value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(value: string): PhoneValue {
    return new PhoneValue(value);
  }
}
