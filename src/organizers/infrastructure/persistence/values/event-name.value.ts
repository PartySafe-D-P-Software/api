import { Column } from 'typeorm';

export class MyEventNameValue {
  @Column('varchar', { name: 'name', length: 50, nullable: false })
  public value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(name: string): MyEventNameValue {
    return new MyEventNameValue(name);
  }
}
