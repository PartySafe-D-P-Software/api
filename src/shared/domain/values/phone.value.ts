import { AppNotification } from 'src/shared/application/app.notification';
import { Result } from 'typescript-result';

export class Phone {
  private value: string;
  private static MAX_LENGTH: number = 9;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(phone: string): Phone {
    phone = (phone ?? '').trim();
    return new Phone(phone);
  }

  public static createResult(phone: string): Result<AppNotification, Phone> {
    let notification: AppNotification = new AppNotification();
    phone = (phone ?? '').trim();
    if (phone === '') {
      notification.addError('phone is required', null);
    }
    if (phone.length != this.MAX_LENGTH) {
      notification.addError(
        'phone field must have ' + Phone.MAX_LENGTH + ' characters',
        null,
      );
    }
    const regExp = new RegExp('^[0-9]+$');
    if (regExp.test(phone) === false) {
      notification.addError('phone format is invalid', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new Phone(phone));
  }

  public getValue(): string {
    return this.value;
  }
}
