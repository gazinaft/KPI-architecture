import { Body, Controller, Param, Post } from '@nestjs/common';
import { BaseHandler } from '../middleware/BaseHandler';
import { AuthHandler } from '../middleware/AuthHandler';
import { LogHandler } from '../middleware/LogHandler';
import { FindService } from './find.service';
import { EventSpecs } from '../data/EventSpecs';

@Controller('find')
export class FindController extends BaseHandler {

  private auth: AuthHandler;
  private log: LogHandler;
  private spec;

  constructor(private readonly findService: FindService) {
    super();
    this.auth = new AuthHandler();
    this.log = new LogHandler();
    this.auth.setNext(this.log);
    this.log.setNext(this);
  }

  @Post(':id')
  async getHello(@Body() body, @Param('id') id: string): Promise<any> {
    const specs = {
      'movie': EventSpecs.Movie(body.find),
      'free': EventSpecs.Free(),
      'price-range': EventSpecs.PriceRange(body.find),
      'excursion': EventSpecs.ExcursionToCity(body.find)
    }

    this.spec = specs[id];

    return await this.auth.handle(body);
  }

  async handle(body) {
    return this.findService.find(body, this.spec);
  }
}
