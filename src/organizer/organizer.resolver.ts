import { Args, Mutation, Resolver, Query, Int } from '@nestjs/graphql';
import { OrganizerService } from './organizer.service';
import { Organizer } from './Organizer';

@Resolver()
export class OrganizerResolver {

  constructor(private organizerService: OrganizerService) {}

  @Mutation(returns => Organizer)
  rateOrganizer(@Args('name') name: string, @Args('grade') grade: number) {
    return this.organizerService.rate(name, grade);
  }

  @Query(returns => [Organizer])
  organizers(@Args('top', { type: () => Int, nullable: true, defaultValue: 0 }) top: number) {
    return this.organizerService.getOrgs(top);
}
}
