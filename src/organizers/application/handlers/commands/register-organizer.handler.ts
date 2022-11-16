import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Organizer } from 'src/organizers/domain/aggregates/organizer/organizer.entity';
import {
  OrganizerRepository,
  ORGANIZER_REPOSITORY,
} from 'src/organizers/domain/aggregates/organizer/organizer.repository';
import { DataSource } from 'typeorm';
import { OrganizerMapper } from '../../mappers/organizer.mapper';
import { RegisterOrganizer } from '../../messages/commands/register-organizer.command';

@CommandHandler(RegisterOrganizer)
export class RegisterOrganizerHandler
  implements ICommandHandler<RegisterOrganizer>
{
  constructor(
    private dataSource: DataSource,
    @Inject(ORGANIZER_REPOSITORY)
    private readonly organizerRepository: OrganizerRepository,
    private publisher: EventPublisher,
  ) {}

  async execute(command: RegisterOrganizer) {
    let organizer: Organizer = OrganizerMapper.commandToDomain(command);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      organizer = await this.organizerRepository.create(organizer);
      if (organizer == null) throw new Error('');
      organizer = this.publisher.mergeObjectContext(organizer);
      organizer.register();
      organizer.commit();
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      organizer = null;
    } finally {
      await queryRunner.release();
    }
    return organizer;
  }
}
