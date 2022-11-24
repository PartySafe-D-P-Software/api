import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterMyEventRequest } from 'src/organizers/application/dtos/register-event-request.dto';
import { RegisterMyEventResponse } from 'src/organizers/application/dtos/register-event-response.dto';
import { GetMyEvent } from 'src/organizers/application/messages/queries/get-event.query';
import { MyEventApplicationService } from 'src/organizers/application/services/event-application.service';
import { AppNotification } from 'src/shared/application/app.notification';
import { ApiController } from 'src/shared/interface/rest/api-controller';
import { Result } from 'typescript-result';

@Controller('events')
@ApiTags('event')
export class MyEventController {
  constructor(
    private readonly myEventApplicationService: MyEventApplicationService,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('')
  @ApiOperation({ summary: 'Register an event' })
  async register(
    @Body() registerMyEventRequest: RegisterMyEventRequest,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterMyEventResponse> =
        await this.myEventApplicationService.register(registerMyEventRequest);
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('')
  @ApiOperation({ summary: 'Get all events' })
  async getAll(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const myEvents = await this.queryBus.execute(new GetMyEvent());
      return ApiController.ok(response, myEvents);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get an event by id' })
  async getById(
    @Param('id') id: number,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const myEvent = await this.myEventApplicationService.getById(id);
      return ApiController.ok(response, myEvent);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/organizerId/:organizerId')
  @ApiOperation({ summary: 'Get events by organizer id' })
  async getByOrganizerId(
    @Param('organizerId') organizerId: number,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const myEvents = await this.myEventApplicationService.getByOrganizerId(
        organizerId,
      );
      return ApiController.ok(response, myEvents);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/price/:price')
  @ApiOperation({ summary: 'Get events by price' })
  async getByPrice(
    @Param('price') price: number,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const myEvents = await this.myEventApplicationService.getByPrice(price);
      return ApiController.ok(response, myEvents);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
