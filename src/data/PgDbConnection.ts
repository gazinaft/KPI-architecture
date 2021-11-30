import { IDbConnection } from './IDbConnection';
import { Event } from '../entities/Event';
import { Person } from '../entities/Person';
import { Pool } from 'pg';
import { config } from '../constants'
import { Prepayment } from '../entities/Prepayment';

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

  public async SupplierExist(supplier: string): Promise<any> {
    return (await this.conn.query(`select * from kindergarten.public.organizer where 
    pers = (select id from kindergarten.public.person where name = '${supplier}' limit 1)`)).rowCount > 0;
  }

  async PersonExist(name: string): Promise<any> {
    return (await this.conn
      .query(`select * from kindergarten.public.person
        where name = '${name}'`)).rowCount > 0;
  }

  async IdFromName(name: string): Promise<any> {
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
    this.conn.query(`insert into kindergarten.public.organizer(pers, grade)
                       values (${await this.IdFromName(supplier)}, ${grade})`)
  }

  public async rateSupplier(supplier: string, grade: number) {
    if (await this.SupplierExist(supplier)) {
      this.conn.query(`update kindergarten.public.organizer
                       SET grade = ${grade}
                       WHERE pers = ${await this.IdFromName(supplier)}`);
    } else {
      await this.addSupplier(supplier, grade);
    }
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
    return (await this.conn.query(`select * from kindergarten.public.organizer where 
    pers = (select id from kindergarten.public.person where name = '${name}' limit 1)`)).rows[0].id;
  }


  async addEvent(evt: Event) {
    if (!await this.eventTypeExist(evt.title)) {
      await this.conn.query(`insert into kindergarten.public.event_type(title) values('${evt.title}')`);
    }
    if (!await this.SupplierExist(evt.organizer)) {
      await this.rateSupplier(evt.organizer, 0);
    }
    const titleId = await this.idFromEvtType(evt.title);
    console.log(titleId);
    console.log(`${titleId}, ${evt.price}, '${evt.description}',
      ${JSON.stringify(evt.date)}, ${await this.organizerIdFromName(evt.organizer)})`);
    this.conn.query(`insert into kindergarten.public.event(id, type, price, description, date, org)
        values(${evt.id}, ${titleId}, ${evt.price}, '${evt.description}',
               '${JSON.stringify(evt.date)}', ${await this.organizerIdFromName(evt.organizer)})`);
  }

  async deleteEvent(evt: Event) {
    await this.conn.query(`delete from kindergarten.public.prepayment where event = ${evt.id}`);
    await this.conn.query(`delete from kindergarten.public.event where id = ${evt.id}`);
  }

  async addPrepayment(pp: Prepayment) {
    if (!await this.PersonExist(pp.person)) {
      await this.addPerson(pp.person);
    }
    this.conn.query(`insert into kindergarten.public.prepayment(event, person)
        values (${pp.event.id}, ${await this.IdFromName(pp.person)})`);
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

}
