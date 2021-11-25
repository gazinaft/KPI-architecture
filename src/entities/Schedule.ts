import {Event} from './Event';

export class Schedule {
  public events: Event[];

  constructor(evts: Event[] = []) {
    this.events = evts;
  }

  addEvents(...evt: Event[]) {
    this.events.push(...evt)
  }

}
