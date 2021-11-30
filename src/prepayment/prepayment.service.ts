import { Injectable } from '@nestjs/common';
import { Prepayment } from '../entities/Prepayment';
import { DataFacade } from '../data/DataFacade';
import { PgDbConnection } from '../data/PgDbConnection';
import { Event } from '../entities/Event';

@Injectable()
export class PrepaymentService {
  private data: DataFacade;

  constructor() {
    this.data = new DataFacade(PgDbConnection.getInstance());
  }

  add(body: {login: string, psw: string, name: string, evt: Event}) {
    this.data.addPrepayment(new Prepayment(body.name, body.evt));
  }
}
