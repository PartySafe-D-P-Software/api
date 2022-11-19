import { AppNotification } from 'src/shared/application/app.notification';
import { Result } from 'typescript-result';

export class Address {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }

  public static create(address: string): Address {
    address = (address ?? '').trim();
    return new Address(address);
  }

  public static createv2(address: string): Result<AppNotification, Address> {
    let notification: AppNotification = new AppNotification();
    address = (address ?? '').trim();
    if (address === '') {
      notification.addError('address is required', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new Address(address));
  }
}
