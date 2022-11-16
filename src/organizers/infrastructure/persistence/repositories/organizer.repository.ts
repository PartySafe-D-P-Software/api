import { InjectRepository } from '@nestjs/typeorm';
import { OrganizerMapper } from 'src/organizers/application/mappers/organizer.mapper';
import { Organizer } from 'src/organizers/domain/aggregates/organizer/organizer.entity';
import { OrganizerRepository } from 'src/organizers/domain/aggregates/organizer/organizer.repository';
import { Repository } from 'typeorm';
import { OrganizerEntity } from '../entities/organizer.entity';

export class OrganizerEntityRepository implements OrganizerRepository {
  constructor(
    @InjectRepository(OrganizerEntity)
    private organizerRepository: Repository<OrganizerEntity>,
  ) {}

  async create(organizer: Organizer): Promise<Organizer> {
    let organizerEntity: OrganizerEntity =
      OrganizerMapper.domainToEntity(organizer);
    organizerEntity = await this.organizerRepository.save(organizerEntity);
    return OrganizerMapper.entityToDomain(organizerEntity);
  }

  async update(organizer: Organizer): Promise<Organizer> {
    let organizerEntity: OrganizerEntity =
      OrganizerMapper.domainToEntity(organizer);
    let organizerId: number = organizer.getId().getValue();
    await this.organizerRepository.update({ id: organizerId }, organizerEntity);
    return organizer;
  }

  async delete(organizerId: number): Promise<boolean> {
    await this.organizerRepository.delete({ id: organizerId });
    return true;
  }

  async getById(id: number): Promise<Organizer> {
    let organizerEntity: OrganizerEntity =
      await this.organizerRepository.findOne({ where: { id: id } });
    return OrganizerMapper.entityToDomain(organizerEntity);
  }

  async getByLocalName(localName: string): Promise<Organizer> {
    let organizerEntity: OrganizerEntity = await this.organizerRepository
      .createQueryBuilder('organizer')
      .where('organizer.localName.value = :localName', { localName: localName })
      .getOne();
    return OrganizerMapper.entityToDomain(organizerEntity);
  }
}
