import { Injectable } from '@nestjs/common';
import { DataFacade } from '../data/DataFacade';
import { PgDbConnection } from '../data/PgDbConnection';
import { delay } from '../utils';

@Injectable()
export class OrganizerService {

  private db: DataFacade;

  constructor() {
    this.db = new DataFacade(PgDbConnection.getInstance());
  }

  async rate(name: string, rating: number): Promise<any> {
    await this.db.rateSupplier(name, rating);
    await delay(20)
    return this.getByName(name)
  }

  async getByName(name: string) {
    return this.db.getSupplier(name)
  }

  getOrgs(top: number) {
    return this.db.getOrgs(top)
  }

}
