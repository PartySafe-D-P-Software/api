import { Column } from 'typeorm';

export class UserIdValue {
  @Column('bigint', { name: 'user_id', nullable: false })
  public userId: number;

  private constructor(userId: number) {
    this.userId = userId;
  }

  public static from(userId: number): UserIdValue {
    return new UserIdValue(userId);
  }
}
