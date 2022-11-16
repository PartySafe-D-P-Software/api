import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';
import { ClientUserDto } from '../../dtos/client-user.dto';
import { ClientMapper } from '../../mappers/client.mapper';
import { GetClientUsers } from '../../messages/queries/get-client-users.query';

@QueryHandler(GetClientUsers)
export class GetClientUsersHandler implements IQueryHandler<GetClientUsers> {
  constructor(private dataSource: DataSource) {}

  async execute(query: GetClientUsers) {
    const manager = this.dataSource.createEntityManager();
    const sql = `
    SELECT
        id,
        first_name as firstName,
        last_name as lastName,
        dni,
        phone
    FROM
        users
    WHERE
        type = 'C'
    ORDER BY
        last_name, first_name;
    `;
    const rows = await manager.query(sql);
    if (rows.length <= 0) return [];
    const clientUsers: ClientUserDto[] = rows.map(function (row: any) {
      return ClientMapper.ormToClientUserDto(row);
    });
    return clientUsers;
  }
}
