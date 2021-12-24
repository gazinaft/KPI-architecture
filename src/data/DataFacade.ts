import { IDbConnection } from './IDbConnection';
import { Event } from '../entities/Event';
import { PriceProvider } from './PriceProvider';
import { api, delay } from '../utils';
import { Prepayment } from '../entities/Prepayment';
import { EventProvider } from '../entities/EventProvider';
import { CachedBuilder } from './CachedBuilder';
import { IBuilder } from './IBuilder';

const detailsURL = 'http://localhost:5000/details/';

export class DataFacade {

  public db: IDbConnection;
  private prices: PriceProvider;

  constructor(dbCon: IDbConnection) {
    this.db = dbCon;
    this.prices = new PriceProvider();
  }

  async getByid(id: number) {
    await delay(20)
    return api(detailsURL + id);
  }

  async cachingEvtsFromProvider(): Promise<Event[]> {
    const res: Event[] = [];
    for (let i = 1; i < await this.prices.length(); ++i) {
      const parsed = await this.getByid(i);
      res.push(new Event(parsed.id, parsed.title, parsed.price,
        parsed.description, new Date(parsed.date), parsed.organizer));
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

  async updateDb() {
    await this.db.clearInfo();
    for (let i = 1; i <= await this.prices.length(); ++i) {
      const parsed = await this.getByid(i);
      await this.db.addEvent(new Event(parsed.id, parsed.title, parsed.price,
        parsed.description, new Date(parsed.date), parsed.organizer));
    }
  }

  async delEvents(evts: Event[]) {
    for (const evt of evts) {
      this.db.deleteEvent(evt);
    }
  }

  findBy(): IBuilder {
    return new CachedBuilder();
  }

  addPrepayment(pp: Prepayment) {
    this.db.addPrepayment(pp);
  }

  rateSupplier(ep: EventProvider) {
    this.db.rateSupplier(ep.person, ep.rating);
  }

}
