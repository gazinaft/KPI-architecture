import { api } from '../utils';

export class PriceProvider {

  private current_page: number;
  readonly adress: string = 'http://localhost:5000/price-list';

  constructor() {
    this.current_page = 0;
  }

  json(num = this.current_page) {
    return api(this.adress + `/${num}`);
  }

  next() {
    this.current_page++;
    return this.json();
  }

  async data(num = this.current_page) {
    return await this.json(num);
  }

  async length() {
    return (await this.data()).length;
  }

}
