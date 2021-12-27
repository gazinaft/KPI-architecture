import { Injectable } from '@nestjs/common';
import { DataFacade } from '../data/DataFacade';
import { PgDbConnection } from '../data/PgDbConnection';
import { Person } from './Person';

@Injectable()
export class PersonService {

  private db: DataFacade;

  constructor() {
    this.db = new DataFacade(PgDbConnection.getInstance());
  }

  getPerson(name: string): Promise<Person> {
    return this.db.getPerson(name);
  }
}
