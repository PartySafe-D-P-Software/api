import { InjectRepository } from '@nestjs/typeorm';
import { MyEventMapper } from 'src/organizers/application/mappers/event.mapper';
import { MyEvent } from 'src/organizers/domain/aggregates/organizer/event.entity';
import { MyEventRepository } from 'src/organizers/domain/aggregates/organizer/event.repository';
import { Repository } from 'typeorm';
import { MyEventEntity } from '../entities/event.entity';

export class MyEventEntityRepository implements MyEventRepository {
  constructor(
    @InjectRepository(MyEventEntity)
    private myEventRepository: Repository<MyEventEntity>,
  ) {}

  async create(myEvent: MyEvent): Promise<MyEvent> {
    let myEventEntity: MyEventEntity = MyEventMapper.domainToEntity(myEvent);
    myEventEntity = await this.myEventRepository.save(myEventEntity);
    return MyEventMapper.entityToDomain(myEventEntity);
  }

  async update(myEvent: MyEvent): Promise<MyEvent> {
    let myEventEntity: MyEventEntity = MyEventMapper.domainToEntity(myEvent);
    let myEventId: number = myEvent.getId().getValue();
    await this.myEventRepository.update({ id: myEventId }, myEventEntity);
    return myEvent;
  }

  async delete(myEventId: number): Promise<boolean> {
    await this.myEventRepository.delete({ id: myEventId });
    return true;
  }

  async getById(id: number): Promise<MyEvent> {
    let myEventEntity: MyEventEntity = await this.myEventRepository.findOne({
      where: { id: id },
    });
    return MyEventMapper.entityToDomain(myEventEntity);
  }

  async getByName(myEventName: string): Promise<MyEvent> {
    let myEventEntity: MyEventEntity = await this.myEventRepository
      .createQueryBuilder('myEvent')
      .where('myEvent.myEventName.value = :myEventName', {
        myEventName: myEventName,
      })
      .getOne();
    return MyEventMapper.entityToDomain(myEventEntity);
  }

  async getByOrganizerId(organizerId: number): Promise<MyEvent[]> {
    let myEventEntities: MyEventEntity[] = await this.myEventRepository
      .createQueryBuilder('myEvent')
      .where('myEvent.organizer.id = :organizerId', {
        organizerId: organizerId,
      })
      .getMany();
    return myEventEntities.map((myEventEntity) =>
      MyEventMapper.entityToDomain(myEventEntity),
    );
  }

  async getByPrice(price: number): Promise<MyEvent[]> {
    let myEventEntities: MyEventEntity[] = await this.myEventRepository
      .createQueryBuilder('myEvent')
      .where('myEvent.price <= :price', {
        price: price,
      })
      .getMany();
    return myEventEntities.map((myEventEntity) =>
      MyEventMapper.entityToDomain(myEventEntity),
    );
  }
}
