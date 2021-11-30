import { Body, Controller, Put } from '@nestjs/common';
import { BaseHandler } from '../middleware/BaseHandler';
import { AuthHandler } from '../middleware/AuthHandler';
import { LogHandler } from '../middleware/LogHandler';
import { RateService } from './rate.service';

@Controller('rate')
export class RateController extends BaseHandler {
  private auth: AuthHandler;
  private log: LogHandler;

  constructor(private readonly rateService: RateService) {
    super();
    this.auth = new AuthHandler();
    this.log = new LogHandler();
    this.auth.setNext(this.log);
    this.log.setNext(this);
  }

  @Put()
  async getHello(@Body() body): Promise<any> {
    return await this.auth.handle(body);
  }

  async handle(body): Promise<any> {
    return this.rateService.rate(body);
  }
}
