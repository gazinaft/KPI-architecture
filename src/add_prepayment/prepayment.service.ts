import { Injectable } from '@nestjs/common';
import { Prepayment } from '../prepayment/Prepayment';
import { DataFacade } from '../data/DataFacade';
import { PgDbConnection } from '../data/PgDbConnection';
import { Event } from '../event/Event';

@Injectable()
export class PrepaymentService {
  private data: DataFacade;

  constructor() {
    this.data = new DataFacade(PgDbConnection.getInstance());
  }

  add(name: string, evt: Event): Promise<Prepayment> {
    return this.data.addPrepayment(name, evt);
  }

  async addById(name: string, evtId: number) {
    const event = await this.data.getEvent(evtId)
    await this.data.addPrepayment(name, event)
  }

}
