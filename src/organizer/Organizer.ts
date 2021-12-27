import { Person } from '../person/Person';
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Organizer {

  @Field(type => Int)
  public id: number;

  @Field(type => Person)
  public person: Person;

  @Field(type => Float)
  public rating: number;

  constructor(id: number, person: Person, rating: number) {
    this.id = id
    this.person = person;
    this.rating = rating;
  }

}
