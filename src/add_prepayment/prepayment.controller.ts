import { Body, Controller, Post } from '@nestjs/common';
import { BaseHandler } from '../middleware/BaseHandler';
import { AuthHandler } from '../middleware/AuthHandler';
import { LogHandler } from '../middleware/LogHandler';
import { PrepaymentService } from './prepayment.service';
import { Event } from '../event/Event';

@Controller('pay')
export class PrepaymentController extends BaseHandler {
  private auth: AuthHandler;
  private log: LogHandler;

  constructor(private readonly ppService: PrepaymentService) {
    super();
    this.auth = new AuthHandler();
    this.log = new LogHandler();
    this.auth.setNext(this.log);
    this.log.setNext(this);
  }

  @Post()
  async getHello(@Body() body: {login: string, psw: string, name: string, evt: Event}): Promise<any> {
    return await this.auth.handle(body);
  }

  async handle(body: {login: string, psw: string, name: string, evt: Event}): Promise<any> {
    return this.ppService.add(body.name, body.evt);
  }
}
