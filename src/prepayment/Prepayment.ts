import { Event } from '../event/Event';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('Prepayment')
export class Prepayment {

  @Field(type => Int)
  public id: number;

  @Field(type => String)
  public person: string;

  @Field(type => Event)
  public event: Event;

  constructor(id: number, person: string, event: Event) {
    this.id = id;
    this.person = person;
    this.event = event;
  }
}
