import { IDbConnection } from './IDbConnection';
import { Event } from '../entities/Event';
import { QueryBuilder } from './QueryBuilder';
import { PriceProvider } from './PriceProvider';
import { api } from '../utils';

const detailsURL = 'http://localhost:5000/details/';
const searchURL = 'http://localhost:5050/search?';

export class DataFacade {

  public db: IDbConnection;
  private prices: PriceProvider;

  constructor(dbCon: IDbConnection) {
    this.db = dbCon;
    this.prices = new PriceProvider();
  }

  async getAllEvents(): Promise<Event[]> {
    const res: Event[] = [];
    for (let i = 0; i < await this.prices.length(); ++i) {
      const parsed = await api(detailsURL + i);
      res.push(new Event(parsed.id, parsed.title, parsed.price,
        parsed.descriprion, new Date(parsed.date), parsed.organizer));
    }
    return res;
  }

  getScheduledEvents(): Promise<Event[]> {
    return this.db.getAllEvents();
  }

  async addEvents(evts: Event[]) {
    this.db.clearInfo();
    for (const event of evts) {
      this.db.addEvent(event);
    }
  }

  async delEvents(evts: Event[]) {
    for (const evt of evts) {
      this.db.deleteEvent(evt);
    }
  }

  findBy(): QueryBuilder {
    return new QueryBuilder(searchURL);
  }

  priceList() {
    return this.prices.data();
  }

  rateSupplier(supplier: string, grade: number) {
    this.db.rateSupplier(supplier, grade);
  }



}
