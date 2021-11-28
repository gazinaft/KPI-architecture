import { IBuilder } from './IBuilder';
import { api } from '../utils';

export class QueryBuilder implements IBuilder {

  private query: string;
  private url: string;

  constructor(adress) {
    this.query = '';
    this.url = adress;
  }

  reset(): QueryBuilder {
    this.query = '';
    return this;
  }

  addFilter(prop: string, value: any): QueryBuilder {
    if (this.query !== '') this.query += '&';
    this.query += prop + '=' + value.toString();
    return this;
  }

  getQuery(): Promise<JSON> {
    return api(this.url + this.query);
  }

}
