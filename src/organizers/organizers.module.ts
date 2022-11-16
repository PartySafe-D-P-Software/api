import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/shared/infrastructure/persistence/entities/user.entity';
import { RegisterOrganizerHandler } from './application/handlers/commands/register-organizer.handler';
import { GetOrganizerUsersHandler } from './application/handlers/queries/get-organizer-users.handler';
import { OrganizerApplicationService } from './application/services/organizer-application.service';
import { RegisterOrganizerValidator } from './application/validators/register-organizer.validator';
import { ORGANIZER_REPOSITORY } from './domain/aggregates/organizer/organizer.repository';
import { OrganizerEntity } from './infrastructure/persistence/entities/organizer.entity';
import { OrganizerEntityRepository } from './infrastructure/persistence/repositories/organizer.repository';
import { OrganizerController } from './interface/rest/organizer.controller';

export const CommandHandlers = [RegisterOrganizerHandler];
export const QueryHandlers = [GetOrganizerUsersHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([UserEntity, OrganizerEntity]),
  ],
  exports: [TypeOrmModule],
  controllers: [OrganizerController],
  providers: [
    { useClass: OrganizerEntityRepository, provide: ORGANIZER_REPOSITORY },
    OrganizerApplicationService,
    RegisterOrganizerValidator,
    OrganizerEntityRepository,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class OrganizersModule {}
