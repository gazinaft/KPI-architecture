import { Injectable } from '@nestjs/common';
import { PgDbConnection } from './data/PgDbConnection';
import { DataFacade } from './data/DataFacade';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    const db = new DataFacade(PgDbConnection.getInstance());
    return JSON.stringify(await db.getAllEvents());
  }
}
