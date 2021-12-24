import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';

@Module({
  imports: [HttpModule],
  controllers: [ScheduleController],
  providers: [ScheduleService]
})

export class ScheduleModule {}
