import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterClientRequest } from 'src/clients/application/dtos/register-client-request.dto';
import { RegisterClientResponse } from 'src/clients/application/dtos/register-client-response.dto';
import { GetClientUsers } from 'src/clients/application/messages/queries/get-client-users.query';
import { ClientApplicationService } from 'src/clients/application/services/client-application.service';
import { AppNotification } from 'src/shared/application/app.notification';
import { ApiController } from 'src/shared/interface/rest/api-controller';
import { Result } from 'typescript-result';

@Controller('users/client')
@ApiTags('client user')
export class ClientController {
  constructor(
    private readonly clientApplicationService: ClientApplicationService,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('')
  @ApiOperation({ summary: 'Register a client' })
  async register(
    @Body() registerClientRequest: RegisterClientRequest,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterClientResponse> =
        await this.clientApplicationService.register(registerClientRequest);
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('')
  @ApiOperation({ summary: 'Get all clients' })
  async getAll(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const clients = await this.queryBus.execute(new GetClientUsers());
      return ApiController.ok(response, clients);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a client by id' })
  async getById(
    @Param('id') id: number,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const person = await this.clientApplicationService.getById(id);
      return ApiController.ok(response, person);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
