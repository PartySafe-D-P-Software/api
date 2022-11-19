import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { MyEvent } from 'src/organizers/domain/aggregates/organizer/event.entity';
import {
  MyEventRepository,
  MYEVENT_REPOSITORY,
} from 'src/organizers/domain/aggregates/organizer/event.repository';
import { DataSource } from 'typeorm';
import { MyEventMapper } from '../../mappers/event.mapper';
import { RegisterMyEvent } from '../../messages/commands/register-event.command';

@CommandHandler(RegisterMyEvent)
export class RegisterMyEventHandler
  implements ICommandHandler<RegisterMyEvent>
{
  constructor(
    private dataSource: DataSource,
    @Inject(MYEVENT_REPOSITORY)
    private readonly myEventRepository: MyEventRepository,
    private publisher: EventPublisher,
  ) {}

  async execute(command: RegisterMyEvent) {
    let myEvent: MyEvent = MyEventMapper.commandToDomain(command);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      myEvent = await this.myEventRepository.create(myEvent);
      if (myEvent == null) throw new Error('');
      myEvent = this.publisher.mergeObjectContext(myEvent);
      myEvent.register();
      myEvent.commit();
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      myEvent = null;
    } finally {
      await queryRunner.release();
    }
    return myEvent;
  }
}
