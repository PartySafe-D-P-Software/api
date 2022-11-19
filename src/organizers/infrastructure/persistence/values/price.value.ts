import { Column } from 'typeorm';

export class PriceValue {
  @Column('decimal', {
    name: 'price',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  public amount: number;

  @Column('varchar', { name: 'currency', length: 3, nullable: false })
  public currency: string;

  private constructor(amount: number, currency: string) {
    this.amount = Number(amount);
    this.currency = currency;
  }

  public static from(amount: number, currency: string): PriceValue {
    return new PriceValue(amount, currency);
  }
}
