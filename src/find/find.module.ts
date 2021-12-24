import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FindController } from './find.controller';
import { FindService } from './find.service';

@Module({
  imports: [HttpModule],
  controllers: [FindController],
  providers: [FindService]
})

export class FindModule {}
