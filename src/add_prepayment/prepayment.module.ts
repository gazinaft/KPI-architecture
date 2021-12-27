import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PrepaymentController } from './prepayment.controller';
import { PrepaymentService } from './prepayment.service';

@Module({
  imports: [HttpModule],
  controllers: [PrepaymentController],
  providers: [PrepaymentService]
})

export class PrepaymentModule {}
