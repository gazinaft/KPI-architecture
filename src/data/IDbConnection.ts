import { EventProvider } from '../entities/EventProvider';
import { Event } from '../entities/Event';
import { Person } from '../entities/Person';

export interface IDbConnection {

  rateSupplier(supplier: string, grade: number): void;
  addEvent(event: Event): void;
  refreshInfo(): void;
  clearTable(table: string): void;
  getPerson(name: string): Person;
}
