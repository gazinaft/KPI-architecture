import { Event } from './Event';

export class Prepayment {
  public person: string;
  public event: Event;

  constructor(person: string, event: Event) {
    this.person = person;
    this.event = event;
  }
}
