import {Event} from './Event';

export class Schedule {
  public events: Event[];

  constructor(...evts) {
    this.events = evts;
  }
}
