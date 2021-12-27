import { Injectable } from '@nestjs/common';
import { DataFacade } from '../data/DataFacade';
import { PgDbConnection } from '../data/PgDbConnection';
import { Event } from './Event';

@Injectable()
export class EventService {

  private data: DataFacade;

  constructor() {
    this.data = new DataFacade(PgDbConnection.getInstance());
  }

  getAllEvents(): Promise<Event[]> {
    return this.data.getAllEvents();
  }

  getScheduled(): Promise<Event[]> {
    return this.data.getScheduledEvents()
  }

  deleteEvent(evtId: number): Promise<Event> {
    return this.data.deleteEvent(evtId);
  }

}
