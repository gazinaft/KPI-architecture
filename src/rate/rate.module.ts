import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RateController } from './rate.controller';
import { RateService } from './rate.service';

@Module({
  imports: [HttpModule],
  controllers: [RateController],
  providers: [RateService]
})

export class RateModule {}
