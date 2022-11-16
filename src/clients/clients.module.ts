import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/shared/infrastructure/persistence/entities/user.entity';
import { RegisterClientHandler } from './application/handlers/commands/register-client.handler';
import { GetClientUsersHandler } from './application/handlers/queries/get-client-users.handler';
import { ClientApplicationService } from './application/services/client-application.service';
import { RegisterClientValidator } from './application/validators/register-client.validator';
import { CLIENT_REPOSITORY } from './domain/aggregates/client/client.repository';
import { ClientEntity } from './infrastructure/persistence/entities/client.entity';
import { ClientEntityRepository } from './infrastructure/persistence/repositories/client.repository';
import { ClientController } from './interface/rest/client.controller';

export const CommandHandlers = [RegisterClientHandler];
export const QueryHandlers = [GetClientUsersHandler];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([UserEntity, ClientEntity])],
  exports: [TypeOrmModule],
  controllers: [ClientController],
  providers: [
    { useClass: ClientEntityRepository, provide: CLIENT_REPOSITORY },
    ClientApplicationService,
    RegisterClientValidator,
    ClientEntityRepository,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class ClientsModule {}
