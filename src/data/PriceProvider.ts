import { api } from '../utils';

export class PriceProvider {

  readonly adress: string = 'http://localhost:5000/price-list';

  json() {
    return api(this.adress);
  }

  async data() {
    return await this.json();
  }

  async length() {
    return (await this.data()).length;
  }

}
