import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { RegisterOrganizerRequest } from 'src/organizers/application/dtos/register-organizer-request.dto';
import { RegisterOrganizerResponse } from 'src/organizers/application/dtos/register-organizer-response.dto';
import { GetOrganizerUsers } from 'src/organizers/application/messages/queries/get-organizer-users.query';
import { OrganizerApplicationService } from 'src/organizers/application/services/organizer-application.service';
import { AppNotification } from 'src/shared/application/app.notification';
import { ApiController } from 'src/shared/interface/rest/api-controller';
import { Result } from 'typescript-result';

@Controller('users/organizer')
export class OrganizerController {
  constructor(
    private readonly organizerApplicationService: OrganizerApplicationService,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('')
  async register(
    @Body() registerOrganizerRequest: RegisterOrganizerRequest,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterOrganizerResponse> =
        await this.organizerApplicationService.register(
          registerOrganizerRequest,
        );
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('')
  async getAll(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const organizers = await this.queryBus.execute(new GetOrganizerUsers());
      return ApiController.ok(response, organizers);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/:id')
  async getById(
    @Param('id') id: number,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const organizer = await this.organizerApplicationService.getById(id);
      return ApiController.ok(response, organizer);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
