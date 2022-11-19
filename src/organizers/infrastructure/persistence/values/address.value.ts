import { Column } from 'typeorm';

export class AddressValue {
  @Column('text', {
    name: 'address',
    nullable: false,
  })
  public value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(value: string): AddressValue {
    return new AddressValue(value);
  }
}
