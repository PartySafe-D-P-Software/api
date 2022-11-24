import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterOrganizerRequest } from 'src/organizers/application/dtos/register-organizer-request.dto';
import { RegisterOrganizerResponse } from 'src/organizers/application/dtos/register-organizer-response.dto';
import { GetOrganizerUsers } from 'src/organizers/application/messages/queries/get-organizer-users.query';
import { OrganizerApplicationService } from 'src/organizers/application/services/organizer-application.service';
import { AppNotification } from 'src/shared/application/app.notification';
import { ApiController } from 'src/shared/interface/rest/api-controller';
import { Result } from 'typescript-result';

@Controller('users/organizer')
@ApiTags('organizer user')
export class OrganizerController {
  constructor(
    private readonly organizerApplicationService: OrganizerApplicationService,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('')
  @ApiOperation({ summary: 'Register an organizer' })
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
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('')
  @ApiOperation({ summary: 'Get all organizers' })
  async getAll(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const organizers = await this.queryBus.execute(new GetOrganizerUsers());
      return ApiController.ok(response, organizers);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get an organizer by id' })
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
