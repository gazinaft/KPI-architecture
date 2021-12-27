import { Injectable } from '@nestjs/common';
import { DataFacade } from '../data/DataFacade';
import { PgDbConnection } from '../data/PgDbConnection';

@Injectable()
export class RateService {
  private data: DataFacade;
  constructor() {
    this.data = new DataFacade(PgDbConnection.getInstance());
  }

  rate(body) {
    return this.data.rateSupplier(body.name, body.grade);
  }

}
