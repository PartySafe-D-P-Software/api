import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/shared/infrastructure/persistence/entities/user.entity';
import { RegisterMyEventHandler } from './application/handlers/commands/register-event.handler';
import { RegisterOrganizerHandler } from './application/handlers/commands/register-organizer.handler';
import { GetMyEventHandler } from './application/handlers/queries/get-event-hanlder';
import { GetOrganizerUsersHandler } from './application/handlers/queries/get-organizer-users.handler';
import { MyEventApplicationService } from './application/services/event-application.service';
import { OrganizerApplicationService } from './application/services/organizer-application.service';
import { RegisterMyEventValidator } from './application/validators/register-event.validator';
import { RegisterOrganizerValidator } from './application/validators/register-organizer.validator';
import { MYEVENT_REPOSITORY } from './domain/aggregates/organizer/event.repository';
import { ORGANIZER_REPOSITORY } from './domain/aggregates/organizer/organizer.repository';
import { MyEventEntity } from './infrastructure/persistence/entities/event.entity';
import { OrganizerEntity } from './infrastructure/persistence/entities/organizer.entity';
import { MyEventEntityRepository } from './infrastructure/persistence/repositories/event.repository';
import { OrganizerEntityRepository } from './infrastructure/persistence/repositories/organizer.repository';
import { MyEventController } from './interface/rest/event.controller';
import { OrganizerController } from './interface/rest/organizer.controller';

export const CommandHandlers = [
  RegisterOrganizerHandler,
  RegisterMyEventHandler,
];
export const QueryHandlers = [GetOrganizerUsersHandler, GetMyEventHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([UserEntity, OrganizerEntity, MyEventEntity]),
  ],
  exports: [TypeOrmModule],
  controllers: [OrganizerController, MyEventController],
  providers: [
    {
      useClass: OrganizerEntityRepository,
      provide: ORGANIZER_REPOSITORY,
    },
    {
      useClass: MyEventEntityRepository,
      provide: MYEVENT_REPOSITORY,
    },
    OrganizerApplicationService,
    MyEventApplicationService,
    RegisterOrganizerValidator,
    RegisterMyEventValidator,
    OrganizerEntityRepository,
    MyEventEntityRepository,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class OrganizersModule {}
