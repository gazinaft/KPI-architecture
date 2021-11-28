import { Body, Controller, Delete, Post } from '@nestjs/common';
import { BaseHandler } from '../logic/BaseHandler';
import { AuthHandler } from '../logic/AuthHandler';
import { LogHandler } from '../logic/LogHandler';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
export class ScheduleController extends BaseHandler {
  private auth: AuthHandler;
  private log: LogHandler;

  constructor(private readonly scheduleService: ScheduleService) {
    super();
    this.auth = new AuthHandler();
    this.log = new LogHandler();
    this.auth.setNext(this.log);
    this.log.setNext(this);
  }

  @Post()
  async getHello(@Body() body): Promise<any> {
    body.toDelete = false;
    return await this.auth.handle(body);
  }

  @Delete()
  async del(@Body() body): Promise<any> {
    body.toDelete = true;
    return await this.auth.handle(body);
  }

  async handle(body): Promise<any> {
    return this.scheduleService.schedule(body);
  }
}
