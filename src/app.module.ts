import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrepaymentController } from './prepayment/prepayment.controller';
import { ScheduleController } from './schedule/schedule.controller';
import { FilterController } from './filter/filter.controller';
import { FindController } from './find/find.controller';
import { RateController } from './rate/rate.controller';
import { ScheduleService } from './schedule/schedule.service';
import { PrepaymentService } from './prepayment/prepayment.service';
import { FilterService } from './filter/filter.service';
import { FindService } from './find/find.service';
import { RateService } from './rate/rate.service';
import { AdminController } from './admin/admin.controller';

@Module({
  imports: [HttpModule],
  controllers: [AppController, ScheduleController, PrepaymentController, FilterController, FindController, RateController, AdminController],
  providers: [AppService, ScheduleService, PrepaymentService, FilterService, FindService, RateService],
})
export class AppModule {}
