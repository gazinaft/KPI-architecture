import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminController } from './admin/admin.controller';
import { FilterModule } from './filter/filter.module';
import { FindModule } from './find/find.module';
import { GraphQLModule } from '@nestjs/graphql';
import { PrepaymentModule } from './add_prepayment/prepayment.module';
import { RateModule } from './rate/rate.module';
import { ScheduleModule } from './schedule/schedule.module';
import { join } from 'path';
import { PersonResolver } from './person/person.resolver';
import { EventResolver } from './event/event.resolver';
import { OrganizerResolver } from './organizer/organizer.resolver';
import { PrepaymentResolver } from './prepayment/prepayment.resolver';
import { EventService } from './event/event.service';
import { FilterService } from './filter/filter.service';
import { OrganizerService } from './organizer/organizer.service';
import { PrepaymentService } from './add_prepayment/prepayment.service';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      debug: true,
      playground: true
    }),
    HttpModule,
    FilterModule,
    FindModule,
    PrepaymentModule,
    RateModule,
    ScheduleModule],
  controllers: [AppController, AdminController],
  providers: [
    AppService,
    PersonResolver,
    EventResolver,
    OrganizerResolver,
    PrepaymentResolver,
    EventService,
    FilterService,
    OrganizerService,
    PrepaymentService,
    OrganizerService
  ],
})
export class AppModule {}
