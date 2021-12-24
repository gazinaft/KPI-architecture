import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminController } from './admin/admin.controller';
import { FilterModule } from './filter/filter.module';
import { FindModule } from './find/find.module';
import { GraphQLModule } from '@nestjs/graphql';
import { PrepaymentModule } from './prepayment/prepayment.module';
import { RateModule } from './rate/rate.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [HttpModule, FilterModule, FindModule, PrepaymentModule, RateModule, ScheduleModule],
  controllers: [AppController, AdminController],
  providers: [AppService],
})
export class AppModule {}
