import { IDbConnection } from './IDbConnection';
import { Client } from 'pg';
import { EventProvider } from '../entities/EventProvider';
import { Event } from '../entities/Event';
import { Person } from '../entities/Person';

export class PgDbConnection implements IDbConnection {

  private static instance: PgDbConnection = null;
  private connection: Client;

  private constructor() {
    this.connection = new Client()
  }

  public static getInstance(): PgDbConnection {
    if (!PgDbConnection.instance) {
      PgDbConnection.instance = new PgDbConnection();
    }
    return PgDbConnection.instance;
  }

  public rateSupplier(supplier: string, grade: number) {
    return ;
  }

  clearTable(table: string) {
    return;
  }

  refreshInfo() {
    return;
  }

  addEvent(event: Event) {
    return;
  }

  getPerson(name: string): Person {
    return new Person(1, 'bob')
  }
}
