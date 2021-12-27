import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Prepayment } from './Prepayment';
import { PrepaymentService } from '../add_prepayment/prepayment.service';

@Resolver(of => Prepayment)
export class PrepaymentResolver {
  constructor(private ppService: PrepaymentService) {}

  @Mutation(returns => Prepayment)
  addPrepayment(@Args('evtId') evtId: number, @Args('name') name: string) {
    return this.ppService.addById(name, evtId);
  }

}
