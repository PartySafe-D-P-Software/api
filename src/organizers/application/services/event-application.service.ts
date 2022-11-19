import { Inject } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MyEvent } from 'src/organizers/domain/aggregates/organizer/event.entity';
import {
  MyEventRepository,
  MYEVENT_REPOSITORY,
} from 'src/organizers/domain/aggregates/organizer/event.repository';
import { AppNotification } from 'src/shared/application/app.notification';
import { Result } from 'typescript-result';
import { RegisterMyEventRequest } from '../dtos/register-event-request.dto';
import { RegisterMyEventResponse } from '../dtos/register-event-response.dto';
import { MyEventMapper } from '../mappers/event.mapper';
import { RegisterMyEvent } from '../messages/commands/register-event.command';
import { RegisterMyEventValidator } from '../validators/register-event.validator';

export class MyEventApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerMyEventValidator: RegisterMyEventValidator,
    @Inject(MYEVENT_REPOSITORY)
    private readonly myEventRepository: MyEventRepository,
  ) {}

  async register(
    registerMyEventRequest: RegisterMyEventRequest,
  ): Promise<Result<AppNotification, RegisterMyEventResponse>> {
    const registerMyEvent: RegisterMyEvent = MyEventMapper.dtoRequestToCommand(
      registerMyEventRequest,
    );
    const notification: AppNotification =
      await this.registerMyEventValidator.validate(registerMyEvent);
    if (notification.hasErrors()) return Result.error(notification);
    const myEvent: MyEvent = await this.commandBus.execute(registerMyEvent);
    const response: RegisterMyEventResponse =
      MyEventMapper.domainToDtoResponse(myEvent);
    return Result.ok(response);
  }

  async getById(id: number) {
    return await this.myEventRepository.getById(id);
  }
}
