import { Controller, Get } from '@nestjs/common';
import { DataFacade } from '../data/DataFacade';
import { PgDbConnection } from '../data/PgDbConnection';

@Controller('admin')
export class AdminController {

  @Get()
  async update() {
    const db = new DataFacade(PgDbConnection.getInstance());
    await db.updateDb();
    // const db = PgDbConnection.getInstance();
    // return [await db.PersonExist('Mark Brown'), await db.PersonExist('Ivan Balanchuk'), await db.PersonExist('Durachina')]
    return 'Done'
  }
}
