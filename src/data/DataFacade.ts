import { IDbConnection } from './IDbConnection';
import { Event } from '../event/Event';
import { PriceProvider } from './PriceProvider';
import { api, delay } from '../utils';
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

  getAllEvents(): Promise<Event[]> {
    return this.db.getAllEvents();
  }

  getScheduledEvents(): Promise<Event[]> {
    return this.db.getScheduled()
  }

  scheduleEvt(id: string) {
    this.db.scheduleEvt(id)
    return this.db.getEvent(id);
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

  async addPrepayment(name, event) {
    return this.db.addPrepayment(name, event);
  }

  rateSupplier(name: string, rating: number) {
    this.db.rateSupplier(name, rating);
  }

  getPerson(name: string) {
    return this.db.getPerson(name);
  }


  async deleteEvent(evtId) {
    const evt = await this.db.getEvent(evtId)
    await this.db.deleteFromSchedule(evtId)
    return evt;
  }

  async getSupplier(name: string) {
    return this.db.getSupplierByName(name);
  }

  getEvent(evtId) {
    return this.db.getEvent(evtId);
  }

  getOrgs(top: number) {
    return this.db.getOrgs(top);
  }

}
