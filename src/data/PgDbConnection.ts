import { IDbConnection } from './IDbConnection';
import { Event } from '../event/Event';
import { Person } from '../person/Person';
import { Pool } from 'pg';
import { config } from '../constants';
import { Prepayment } from '../prepayment/Prepayment';
import { delay } from '../utils';
import { Organizer } from '../organizer/Organizer';

export class PgDbConnection implements IDbConnection {

  private static instance: PgDbConnection = null;
  private conn: Pool;

  private constructor() {
    this.conn = new Pool(config);
  }

  public static getInstance(): PgDbConnection {
    if (!PgDbConnection.instance) {
      PgDbConnection.instance = new PgDbConnection();
    }
    return PgDbConnection.instance;
  }

  async getSupplierByName(name: string): Promise<Organizer> {
    const q = (await this.conn.query(`select * from kindergarten.public.organizer where 
    pers = (select id from kindergarten.public.person where name = '${name}' limit 1)`)).rows[0];
    return new Organizer(q.id, await this.getPerson(name), q.rate)
  }

  public async SupplierExist(supplier: string): Promise<any> {
    return (await this.conn.query(`select * from kindergarten.public.organizer where 
    pers = (select id from kindergarten.public.person where name = '${supplier}' limit 1)`)).rowCount > 0;
  }

  async PersonExist(name: string): Promise<any> {
    return (await this.conn
      .query(`select exists(select name from kindergarten.public.person where name = '${name}')`)).rows[0].exists;
  }

  async IdFromName(name: string): Promise<any> {
    if (!(await this.PersonExist(name))) {
      await this.addPerson(name);
    }
    await delay(10)
    return (await this.conn
      .query(`select id from kindergarten.public.person
        where name = '${name}'`)).rows[0].id;
  }

  async addPerson(name: string) {
    this.conn.query(`insert into kindergarten.public.person(name) values ('${name}')`)
  }

  async addSupplier(supplier: string, grade: number) {
    if (!(await this.PersonExist(supplier))) {
      await this.addPerson(supplier)
    }
    await delay(10)
    this.conn.query(`insert into kindergarten.public.organizer(pers, grade)
                       values (${await this.IdFromName(supplier)}, ${grade})`)
  }

  public async rateSupplier(supplier: string, grade: number) {
    if (await this.SupplierExist(supplier)) {
      await this.conn.query(`update kindergarten.public.organizer
                       SET grade = ${grade}
                       WHERE pers = ${await this.IdFromName(supplier)}`);
    } else {
      await this.addSupplier(supplier, grade);
    }
    await delay(10)
    return this.getSupplierByName(supplier);
  }

  clearTable(table: string) {
    this.conn.query(`delete from ${table}`);
  }

  async clearInfo() {
    await this.clearTable('prepayment')
    await this.clearTable('event');
  }

  public async eventTypeExist(evtType: string) {
    return (await this.conn
      .query(`select * from kindergarten.public.event_type
        where title = '${evtType}'`)).rowCount > 0;
  }

  public async idFromEvtType(evtType: string) {
    return (await this.conn
      .query(`select id from kindergarten.public.event_type
        where title = '${evtType}'`)).rows[0].id;
  }

  async organizerIdFromName(name: string) {
    if (!(await this.SupplierExist(name))) {
      await this.rateSupplier(name, 0);
    }
    await delay(10)
    const a = (await this.conn.query(`select * from kindergarten.public.organizer where 
    pers = (select id from kindergarten.public.person where name = '${name}' limit 1)`))
    return a.rows[0].id;
  }


  async addEvent(evt: Event) {
    if (!await this.eventTypeExist(evt.title)) {
      await this.conn.query(`insert into kindergarten.public.event_type(title) values('${evt.title}')`);
    }
    if (!await this.SupplierExist(evt.organizer)) {
      await this.rateSupplier(evt.organizer, 0);
    }
    await delay(10)
    const titleId = await this.idFromEvtType(evt.title);
    console.log(titleId);
    console.log(`${titleId}, ${evt.price}, '${evt.description}',
      ${JSON.stringify(evt.date)}, ${await this.organizerIdFromName(evt.organizer)}`);
    this.conn.query(`insert into kindergarten.public.event(id, type, price, description, date, org)
        values(${evt.id}, ${titleId}, ${evt.price}, '${evt.description}',
               '${JSON.stringify(evt.date)}', ${await this.organizerIdFromName(evt.organizer)})`);
  }

  async deleteEvent(evt: Event) {
    await this.conn.query(`delete from kindergarten.public.prepayment where event = ${evt.id}`);
    await this.conn.query(`delete from kindergarten.public.event where id = ${evt.id}`);
  }

  async addPrepayment(name: string, evt: Event) {
    if (!await this.PersonExist(name)) {
      await this.addPerson(name);
    }
    await this.conn.query(`insert into kindergarten.public.prepayment(event, person)
        values (${evt.id}, ${await this.IdFromName(name)})`);
    await delay(10)
    return this.getPrepayment(evt.id.toString(), name);
  }

  async getPrepayment(eid: string, name: string) {
    const q = (await this.conn.query(`select pp.id from kindergarten.public.prepayment pp
        join kindergarten.public.event e on e.id = pp.event
        join kindergarten.public.person p on p.id = pp.person
        where e.id = ${eid} and p.name = ${name}`)).rows[0];
    return new Prepayment(q.id, name, await this.getEvent(eid));
  }

  async getPerson(name: string): Promise<Person> {
    const q = (await this.conn
      .query(`select * from kindergarten.public.person where name = '${name}'`)).rows[0];
    return new Person(q.id, q.name)
  }

  async getAllEvents(): Promise<Event[]> {
    const data = (await this.conn.query(`select e.id, et.title, e.price, e.description, e.date, p.name
                                  from kindergarten.public.event e
    join kindergarten.public.event_type et on et.id = e.type
    join kindergarten.public.organizer o on o.id = e.org
    join kindergarten.public.person p on p.id = o.pers`)).rows;

    return data.map(x => new Event(x.id, x.title, x.price, x.description, x.date, x.name))
  }

  async getScheduled(): Promise<Event[]> {
    const data = (await this.conn.query(`select e.id, et.title, e.price, e.description, e.date, p.name
                                  from kindergarten.public.scheduled sc
    join kindergarten.public.event e on e.id = sc.event_id
    join kindergarten.public.event_type et on et.id = e.type
    join kindergarten.public.organizer o on o.id = e.org
    join kindergarten.public.person p on p.id = o.pers`)).rows;

    return data.map(x => new Event(x.id, x.title, x.price, x.description, x.date, x.name))
  }

  scheduleEvt(id: string) {
    this.conn.query(`insert into kindergarten.public.scheduled(event_id)
    values (${id})`)
  }

  deleteFromSchedule(id: string) {
    this.conn.query(`delete from kindergarten.public.scheduled where event_id = ${id}`)
  }

  async filterEvents(query: string) {
    return (await this.conn.query(`
        select * from kindergarten.public.event
        where ${query}`)).rows
  }

  async getEvent(id: string) {
    const data = (await this.conn.query(`select e.id, et.title, e.price, e.description, e.date, p.name
                                  from kindergarten.public.event e
    join kindergarten.public.event_type et on et.id = e.type
    join kindergarten.public.organizer o on o.id = e.org
    join kindergarten.public.person p on p.id = o.pers
    where e.id = ${id}`)).rows[0];

    return new Event(data.id, data.title, data.price, data.description, data.date, data.name);
  }

  async getOrgs(top: number): Promise<Organizer[]> {
    const qs = (await this.conn.query(`select o.id as oid, p.id as pid, p.name, o.grade from kindergarten.public.organizer o 
        join kindergarten.public.person p on p.id = o.pers
        order by o.grade desc ${top === 0 ? '' : `limit ${top}`}`)).rows
    return qs.map(x => new Organizer(x.oid, new Person(x.pid, x.name), x.grade));
  }

}
