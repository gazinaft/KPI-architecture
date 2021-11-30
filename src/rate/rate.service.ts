import { Injectable } from '@nestjs/common';
import { DataFacade } from '../data/DataFacade';
import { PgDbConnection } from '../data/PgDbConnection';
import { EventProvider } from '../entities/EventProvider';

@Injectable()
export class RateService {
  private data: DataFacade;
  constructor() {
    this.data = new DataFacade(PgDbConnection.getInstance());
  }

  rate(body) {
    return this.data.rateSupplier(new EventProvider(body.name, body.grade));
  }

}
