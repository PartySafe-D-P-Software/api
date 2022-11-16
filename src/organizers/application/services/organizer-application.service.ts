import { Inject, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Organizer } from 'src/organizers/domain/aggregates/organizer/organizer.entity';
import {
  OrganizerRepository,
  ORGANIZER_REPOSITORY,
} from 'src/organizers/domain/aggregates/organizer/organizer.repository';
import { AppNotification } from 'src/shared/application/app.notification';
import { Result } from 'typescript-result';
import { RegisterOrganizerRequest } from '../dtos/register-organizer-request.dto';
import { RegisterOrganizerResponse } from '../dtos/register-organizer-response.dto';
import { OrganizerMapper } from '../mappers/organizer.mapper';
import { RegisterOrganizer } from '../messages/commands/register-organizer.command';
import { RegisterOrganizerValidator } from '../validators/register-organizer.validator';

@Injectable()
export class OrganizerApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerOrganizerValidator: RegisterOrganizerValidator,
    @Inject(ORGANIZER_REPOSITORY)
    private readonly organizerRepository: OrganizerRepository,
  ) {}

  async register(
    registerOrganizerRequest: RegisterOrganizerRequest,
  ): Promise<Result<AppNotification, RegisterOrganizerResponse>> {
    const registerOrganizer: RegisterOrganizer =
      OrganizerMapper.dtoRequestToCommand(registerOrganizerRequest);
    const notification: AppNotification =
      await this.registerOrganizerValidator.validate(registerOrganizer);
    if (notification.hasErrors()) return Result.error(notification);
    const organizer: Organizer = await this.commandBus.execute(
      registerOrganizer,
    );
    const response: RegisterOrganizerResponse =
      OrganizerMapper.domainToDtoResponse(organizer);
    return Result.ok(response);
  }

  async getById(id: number) {
    return await this.organizerRepository.getById(id);
  }
}
