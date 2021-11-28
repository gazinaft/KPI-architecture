import { Person } from './Person'
import { Event } from './Event';

export class EventProvider {
  public person: Person;
  public rating: number;
  public events: Event[];

  constructor(person: Person, rating: number) {
    this.person = person;
    this.rating = rating;
  }
}
