export class PriceProvider {
  readonly adress: string = 'localhost:5000/price-list';

  json() {
    return fetch(this.adress).then(x => x.json());
  }

  async data() {
    return JSON.parse(await this.json())
  }

  async length() {
    return (await this.data()).length;
  }

}
