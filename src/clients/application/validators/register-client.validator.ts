import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'src/clients/domain/aggregates/client/client.entity';
import {
  ClientRepository,
  CLIENT_REPOSITORY,
} from 'src/clients/domain/aggregates/client/client.repository';
import { AppNotification } from 'src/shared/application/app.notification';
import { RegisterClient } from '../messages/commands/register-client.command';

@Injectable()
export class RegisterClientValidator {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private clientRepository: ClientRepository,
  ) {}

  public async validate(
    registerClient: RegisterClient,
  ): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const firstName: string = registerClient.firstName
      ? registerClient.firstName.trim()
      : '';
    if (firstName.length <= 0) {
      notification.addError('firstName is required', null);
    }
    const lastName: string = registerClient.lastName
      ? registerClient.lastName.trim()
      : '';
    if (lastName.length <= 0) {
      notification.addError('lastName is required', null);
    }
    const dni: string = registerClient.dni ? registerClient.dni.trim() : '';
    if (dni.length <= 0) {
      notification.addError('dni is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    const client: Client = await this.clientRepository.getByDni(dni);
    if (client != null) notification.addError('dni is taken', null);

    return notification;
  }
}
