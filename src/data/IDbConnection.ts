import { Event } from '../entities/Event';
import { Person } from '../entities/Person';
import { Prepayment } from '../entities/Prepayment';

export interface IDbConnection {

  rateSupplier(supplier: string, grade: number): void;
  addEvent(event: Event): void;
  clearInfo(): void;
  clearTable(table: string): void;
  getAllEvents(): Promise<Event[]>
  getPerson(name: string): Promise<Person>;
  deleteEvent(evt: Event);
  addPrepayment(pp: Prepayment);
}
