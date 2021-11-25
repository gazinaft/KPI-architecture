import { IBuilder } from './IBuilder';

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

  addFilter(prop: string, value: string): QueryBuilder {
    if (this.query !== '') this.query += '&';
    this.query += prop + '=' + value;
    return this;
  }

  getQuery(): Promise<JSON> {
    return fetch(this.url + this.query).then(x => x.json())
  }

}
