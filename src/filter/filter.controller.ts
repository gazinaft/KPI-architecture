import { Body, Controller, Post } from '@nestjs/common';
import { FilterService } from './filter.service';
import { BaseHandler } from '../middleware/BaseHandler';
import { AuthHandler } from '../middleware/AuthHandler';
import { LogHandler } from '../middleware/LogHandler';

@Controller('filter')
export class FilterController extends BaseHandler {

  private auth: AuthHandler;
  private log: LogHandler;

  constructor(private readonly filterService: FilterService) {
    super();
    this.auth = new AuthHandler();
    this.log = new LogHandler();
    this.auth.setNext(this.log);
    this.log.setNext(this);
  }

  @Post()
  async getHello(@Body() body): Promise<any> {
    return await this.auth.handle(body);
  }

  async handle(body): Promise<any> {
    return this.filterService.filter(body);
  }

}
