import { Resolver } from '@nestjs/graphql';
import { Person } from './Person';

@Resolver(of => Person)
export class PersonResolver {}
