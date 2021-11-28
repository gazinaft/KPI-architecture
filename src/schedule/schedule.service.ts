import { Injectable } from '@nestjs/common';
import { DataFacade } from '../data/DataFacade';
import { PgDbConnection } from '../data/PgDbConnection';
import { Event } from '../entities/Event';

@Injectable()
export class ScheduleService {
  private data: DataFacade;
  constructor() {
    this.data = new DataFacade(PgDbConnection.getInstance());
  }

  schedule(body) {
    const evts = body.evts.map(x => new Event(x.id, x.title, x.price, x.description, x.date, x.organizer));
    if (body.toDelete) {
      this.data.delEvents(evts);
    } else {
      this.data.addEvents(evts);
    }
  }

}
