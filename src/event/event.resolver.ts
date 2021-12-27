import { Args, Mutation, Resolver, Int } from '@nestjs/graphql';
import { Event } from './Event';
import { Query } from '@nestjs/graphql';
import { EventService } from './event.service';

@Resolver(of => Event)
export class EventResolver {

  constructor(
    private eventService: EventService
  ) {}

  @Query(returns => [Event])
  getAllEvents() {
    return this.eventService.getAllEvents();
  }

  @Query(returns => [Event])
  getScheduled() {
    return this.eventService.getScheduled();
  }


  @Mutation(returns => Event)
  deleteEvent(@Args('evtId', { type: () => Int }) evtId: number) {
    return this.eventService.deleteEvent(evtId);
  }

}
