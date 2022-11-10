import { Column } from 'typeorm';

export class LocalNameValue {
  @Column('varchar', { name: 'local_name', length: 100, nullable: true })
  public value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(name: string): LocalNameValue {
    return new LocalNameValue(name);
  }
}
