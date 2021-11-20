import { Person } from './Person';
import { Event } from './Event';

export class Prepayment {
  public person: Person;
  public event: Event;
  public money: number;

  constructor(person: Person, event: Event, money: number) {
    this.person = person;
    this.event = event;
    this.money = money;
  }
}
