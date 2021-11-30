import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { BaseHandler } from '../middleware/BaseHandler';
import { AuthHandler } from '../middleware/AuthHandler';
import { LogHandler } from '../middleware/LogHandler';
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

  @Get()
  async getScheduled(): Promise<any> {
    return this.scheduleService.getSchedule();
  }

  @Post()
  async getHello(@Body() body): Promise<any> {
    body.toDelete = false;
    return await this.auth.handle(JSON.parse(body));
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
