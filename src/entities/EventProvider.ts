import { Person } from './Person'
import { Event } from './Event';

export class EventProvider {
  public person: Person;
  public rating: number;
  public events: Event[];

  constructor(person: Person, rating: number, events: Event[]) {
    this.person = person;
    this.rating = rating;
    this.events = events;
  }
}
