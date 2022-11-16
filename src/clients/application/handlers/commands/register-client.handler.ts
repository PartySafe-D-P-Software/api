import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Client } from 'src/clients/domain/aggregates/client/client.entity';
import {
  ClientRepository,
  CLIENT_REPOSITORY,
} from 'src/clients/domain/aggregates/client/client.repository';
import { DataSource } from 'typeorm';
import { ClientMapper } from '../../mappers/client.mapper';
import { RegisterClient } from '../../messages/commands/register-client.command';

@CommandHandler(RegisterClient)
export class RegisterClientHandler implements ICommandHandler<RegisterClient> {
  constructor(
    private dataSource: DataSource,
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository: ClientRepository,
    private publisher: EventPublisher,
  ) {}

  async execute(command: RegisterClient) {
    let client: Client = ClientMapper.commandToDomain(command);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      client = await this.clientRepository.create(client);
      if (client == null) throw new Error('');
      client = this.publisher.mergeObjectContext(client);
      client.register();
      client.commit();
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      client = null;
    } finally {
      await queryRunner.release();
    }
    return client;
  }
}
