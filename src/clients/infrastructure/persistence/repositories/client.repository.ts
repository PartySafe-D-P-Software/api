import { InjectRepository } from '@nestjs/typeorm';
import { ClientMapper } from 'src/clients/application/mappers/client.mapper';
import { Client } from 'src/clients/domain/aggregates/client/client.entity';
import { ClientRepository } from 'src/clients/domain/aggregates/client/client.repository';
import { Repository } from 'typeorm';
import { ClientEntity } from '../entities/client.entity';

export class ClientEntityRepository implements ClientRepository {
  constructor(
    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>,
  ) {}

  async create(client: Client): Promise<Client> {
    let clientEntity: ClientEntity = ClientMapper.domainToEntity(client);
    clientEntity = await this.clientRepository.save(clientEntity);
    return ClientMapper.entityToDomain(clientEntity);
  }

  async update(client: Client): Promise<Client> {
    let clientEntity: ClientEntity = ClientMapper.domainToEntity(client);
    let clientId: number = client.getId().getValue();
    await this.clientRepository.update({ id: clientId }, clientEntity);
    return client;
  }

  async delete(clientId: number): Promise<boolean> {
    await this.clientRepository.delete({ id: clientId });
    return true;
  }

  async getById(id: number): Promise<Client> {
    let clientEntity: ClientEntity = await this.clientRepository.findOne({
      where: { id: id },
    });
    return ClientMapper.entityToDomain(clientEntity);
  }

  async getByDni(dni: string): Promise<Client> {
    let clientEntity: ClientEntity = await this.clientRepository
      .createQueryBuilder()
      .where('dni = :dni', { dni: dni })
      .getOne();
    return ClientMapper.entityToDomain(clientEntity);
  }
}
