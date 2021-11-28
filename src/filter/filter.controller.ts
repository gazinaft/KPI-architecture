import { Body, Controller, Get } from '@nestjs/common';
import { FilterService } from './filter.service';
import { BaseHandler } from '../logic/BaseHandler';
import { AuthHandler } from '../logic/AuthHandler';
import { LogHandler } from '../logic/LogHandler';

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

  @Get()
  async getHello(@Body() body): Promise<any> {
    return await this.auth.handle(body);
  }

  async handle(body): Promise<any> {
    return this.filterService.filter(body);
  }

}
