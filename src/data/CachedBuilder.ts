import { IBuilder } from './IBuilder';
import { IDbConnection } from './IDbConnection';
import { PgDbConnection } from './PgDbConnection';

export class CachedBuilder implements IBuilder {

  private query: string;
  private db: IDbConnection;

  constructor() {
    this.query = '';
    this.db = PgDbConnection.getInstance()
  }

  reset(): CachedBuilder {
    this.query = '';
    return this;
  }

  addFilter(prop: string, value: any): CachedBuilder {
    if (this.query !== '') this.query += ' and ';
    this.query += `${prop} = '${value}'`;
    return this;
  }

  getQuery(): Promise<JSON> {
    console.log(this.query);
    if (this.query === '') return new Promise<JSON>(() => []);

    return new Promise<JSON>(this.db.where(this.query));
  }
}
