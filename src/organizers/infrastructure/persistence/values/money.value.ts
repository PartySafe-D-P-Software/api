import { Column } from 'typeorm';

export class MoneyValue {
  @Column('decimal', {
    name: 'amount',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  public amount: number;

  @Column('varchar', { name: 'currency', length: 3, nullable: true })
  public currency: string;

  private constructor(amount: number, currency: string) {
    this.amount = Number(amount);
    this.currency = currency;
  }

  public static from(amount: number, currency: string): MoneyValue {
    return new MoneyValue(amount, currency);
  }
}
