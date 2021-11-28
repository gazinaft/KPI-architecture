import { Injectable } from '@nestjs/common';
import { DataFacade } from '../data/DataFacade';
import { PgDbConnection } from '../data/PgDbConnection';

@Injectable()
export class FilterService {
  private data: DataFacade;
  constructor() {
    this.data = new DataFacade(PgDbConnection.getInstance());
  }

  filter(body) {
    const query = this.data.findBy();
    for (const key in body) {
      query.addFilter(key, body[key])
    }
    return query.getQuery()
  }
}
