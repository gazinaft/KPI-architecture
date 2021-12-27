import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('Event')
export class Event {

  @Field(type => Int)
  public id: number;

  @Field()
  public title: string;

  @Field(type => Int)
  public price: number;

  @Field()
  public description: string;

  @Field()
  public date: Date;

  @Field()
  public organizer: string;

  constructor(id: number, title: string, price: number, description: string, date: Date, organizer: string) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.date = date;
    this.organizer = organizer;
  }
}
