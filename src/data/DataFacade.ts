import { IDbConnection } from './IDbConnection';
import { Event } from '../entities/Event';
import { QueryBuilder } from './QueryBuilder';
import { PriceProvider } from './PriceProvider';

const detailsURL = 'localhost:5000/details/';
const searchURL = 'localhost:5050/search?';

export class DataFacade {

  private db: IDbConnection;
  private prices: PriceProvider;

  constructor(dbCon: IDbConnection) {
    this.db = dbCon;
    this.prices = new PriceProvider();
  }

  async refreshInfo() {
    this.db.refreshInfo();
    const ids = (await this.prices.data()).map(x => x.id);
    for (const id of ids) {
      const evt = await fetch(detailsURL + id).then(x => x.json());
      this.db.addEvent(new Event(evt.title, evt.price, evt.description, evt.date, evt.organizer));
    }
  }

  findBy(): QueryBuilder {
    return new QueryBuilder(searchURL);
  }

  priceList() {
    return this.prices.data();
  }

  async getAllEvents(): Promise<Event[]> {
    const res: Event[] = [];
    for (let i = 0; i < await this.prices.length(); ++i) {
      const parsed = JSON.parse(await fetch(detailsURL + i).then(x => x.json()));
      res.push(new Event(parsed.title, parsed.price, parsed.description, parsed.date, parsed.organizer));
    }
    return res;
  }

  rateSupplier(supplier: string, grade: number) {
    this.db.rateSupplier(supplier, grade);
  }



}
