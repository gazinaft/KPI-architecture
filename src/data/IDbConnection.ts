import { Event } from '../event/Event';
import { Person } from '../person/Person';
import { Organizer } from '../organizer/Organizer';

export interface IDbConnection {

  rateSupplier(supplier: string, grade: number): void;
  addEvent(event: Event): void;
  clearInfo(): void;
  clearTable(table: string): void;
  getAllEvents(): Promise<Event[]>
  getPerson(name: string): Promise<Person>;
  deleteEvent(evt: Event);
  addPrepayment(name: string, evt: Event);
  filterEvents(query: string);
  getScheduled(): Promise<Event[]>;
  scheduleEvt(id: string);
  deleteFromSchedule(id: string);
  getEvent(id: string): Promise<Event>;
  getSupplierByName(name: string): Promise<Organizer>;
  getOrgs(top: number): Promise<Organizer[]>;
}
