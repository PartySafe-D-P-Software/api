import { Client } from './client.entity';

export const PERSON_REPOSITORY = 'PersonRepository';

export interface PersonRepository {
  create(client: Client): Promise<Client>;
  update(client: Client): Promise<Client>;
  delete(clientId: number): Promise<boolean>;
  getById(id: number): Promise<Client>;
  getByDni(dni: string): Promise<Client>;
}
