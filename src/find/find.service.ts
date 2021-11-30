import { Injectable } from '@nestjs/common';
import { DataFacade } from '../data/DataFacade';
import { PgDbConnection } from '../data/PgDbConnection';
import { DirectSpecs } from '../data/DirectSpecs';
import { Event } from '../entities/Event';

@Injectable()
export class FindService {

  private data: DataFacade;
  constructor() {
    this.data = new DataFacade(PgDbConnection.getInstance());
  }

  async find(body, specs: DirectSpecs<Event>) {
    return JSON.stringify((await this.data.getAllEvents()).filter(evt => specs.isSatisfiedBy(evt)));
  }
}
