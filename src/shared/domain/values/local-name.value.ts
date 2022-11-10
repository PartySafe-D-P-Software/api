import { Result } from 'typescript-result';
import { AppNotification } from '../../application/app.notification';

export class LocalName {
  private readonly value: string;
  private static MAX_LENGTH: number = 100;

  private constructor(value: string) {
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }

  public static create(name: string): LocalName {
    name = (name ?? '').trim();
    return new LocalName(name);
  }

  public static createv2(name: string): Result<AppNotification, LocalName> {
    let notification: AppNotification = new AppNotification();
    name = (name ?? '').trim();
    if (name === '') {
      notification.addError('name is required', null);
    }
    if (name.length > this.MAX_LENGTH) {
      notification.addError(
        'The maximum length of an name is ' +
          this.MAX_LENGTH +
          ' characters including spaces',
        null,
      );
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new LocalName(name));
  }
}
