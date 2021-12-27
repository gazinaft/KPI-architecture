import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Person {
  @Field(type => Int)
  public id: number;

  @Field()
  public name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
