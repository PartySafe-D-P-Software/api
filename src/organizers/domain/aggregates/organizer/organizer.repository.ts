import { Organizer } from './organizer.entity';

export const ORGANIZER_REPOSITORY = 'OrganizerRepository';

export interface OrganizerRepository {
  create(organizer: Organizer): Promise<Organizer>;
  update(organizer: Organizer): Promise<Organizer>;
  delete(organizerId: number): Promise<boolean>;
  getById(id: number): Promise<Organizer>;
  getByLocalName(name: string): Promise<Organizer>;
}
