import { QueryHandler } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';
import { OrganizerUserDto } from '../../dtos/organizer-user.dto';
import { OrganizerMapper } from '../../mappers/organizer.mapper';
import { GetOrganizerUsers } from '../../messages/queries/get-organizer-users.query';

@QueryHandler(GetOrganizerUsers)
export class GetOrganizerUsersHandler {
  constructor(private dataSource: DataSource) {}

  async execute(query: GetOrganizerUsers) {
    const manager = this.dataSource.createEntityManager();
    const sql = `
    SELECT 
      id,
      local_name as localName,
      phone
    FROM 
      users
    WHERE
      type = 'O'
    ORDER BY
      local_name;
    `;
    const rows = await manager.query(sql);
    if (rows.length <= 0) return [];
    const organizerClients: OrganizerUserDto[] = rows.map(function (row: any) {
      return OrganizerMapper.ormToOrganizerUserDto(row);
    });
    return organizerClients;
  }
}
