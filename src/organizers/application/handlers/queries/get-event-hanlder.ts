import { QueryHandler } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';
import { MyEventDto } from '../../dtos/event.dto';
import { MyEventMapper } from '../../mappers/event.mapper';
import { GetMyEvent } from '../../messages/queries/get-event.query';

@QueryHandler(GetMyEvent)
export class GetMyEventHandler {
  constructor(private dataSource: DataSource) {}

  async execute(query: GetMyEvent) {
    const manager = this.dataSource.createEntityManager();
    const sql = `
    SELECT 
      id,
      name as myEventName,
      description
    FROM 
      events
    ORDER BY
      name;
    `;
    const rows = await manager.query(sql);
    if (rows.length <= 0) return [];
    const myEvents: MyEventDto[] = rows.map(function (row: any) {
      return MyEventMapper.ormToMyEventDto(row);
    });
    return myEvents;
  }
}
