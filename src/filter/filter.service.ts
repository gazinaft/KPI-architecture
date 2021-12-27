import { Injectable } from '@nestjs/common';
import { DataFacade } from '../data/DataFacade';
import { PgDbConnection } from '../data/PgDbConnection';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class FilterService {
  private data: DataFacade;
  constructor() {
    this.data = new DataFacade(PgDbConnection.getInstance());
  }

  filter(body) {
    const query = this.data.findBy();
    for (const key in body.props) {
      query.addFilter(key, body.props[key]);
    }
    return query.getQuery()
  }

  async filterSimple(key: string, value:string) {
    const query = this.data.findBy();
    query.addFilter(key, value);
    return await query.getQuery();
  }

  @Cron('0 0 0 * * *')
  refreshDB() {
    this.data.updateDb()
  }
}
