import { AppNotification } from 'src/shared/application/app.notification';
import { Result } from 'typescript-result';

export class MyEventName {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }

  public static create(name: string): MyEventName {
    name = (name ?? '').trim();
    return new MyEventName(name);
  }

  public static createv2(name: string): Result<AppNotification, MyEventName> {
    let notification: AppNotification = new AppNotification();
    name = (name ?? '').trim();
    if (name === '') {
      notification.addError('name is required', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new MyEventName(name));
  }
}
