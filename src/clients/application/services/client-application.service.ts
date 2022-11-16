import { Inject, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Client } from 'src/clients/domain/aggregates/client/client.entity';
import {
  ClientRepository,
  CLIENT_REPOSITORY,
} from 'src/clients/domain/aggregates/client/client.repository';
import { AppNotification } from 'src/shared/application/app.notification';
import { Result } from 'typescript-result';
import { RegisterClientRequest } from '../dtos/register-client-request.dto';
import { RegisterClientResponse } from '../dtos/register-client-response.dto';
import { ClientMapper } from '../mappers/client.mapper';
import { RegisterClient } from '../messages/commands/register-client.command';
import { RegisterClientValidator } from '../validators/register-client.validator';

@Injectable()
export class ClientApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerClientValidator: RegisterClientValidator,
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository: ClientRepository,
  ) {}

  async register(
    registerClientRequest: RegisterClientRequest,
  ): Promise<Result<AppNotification, RegisterClientResponse>> {
    const registerClient: RegisterClient = ClientMapper.dtoRequestToCommand(
      registerClientRequest,
    );
    const notification: AppNotification =
      await this.registerClientValidator.validate(registerClient);
    if (notification.hasErrors()) return Result.error(notification);
    const client: Client = await this.commandBus.execute(registerClient);
    const response: RegisterClientResponse =
      ClientMapper.domainToDtoResponse(client);
    return Result.ok(response);
  }

  async getById(id: number) {
    return await this.clientRepository.getById(id);
  }
}
