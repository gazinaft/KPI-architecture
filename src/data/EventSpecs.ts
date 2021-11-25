import { DirectSpecs } from './DirectSpecs';
import { Event } from '../entities/Event';

export class EventSpecs {

  public static Free(): DirectSpecs<Event[]> {
    return new DirectSpecs<Event[]>(((e: Event) => e.price === 0));
  }

  public static Movie(movie: string): DirectSpecs<Event[]> {
    return new DirectSpecs<Event[]>((e: Event) =>
      e.title === 'Cinema' && e.description.includes(movie));
  }

  public static ExcursionToCity(city: string): DirectSpecs<Event[]> {
    return new DirectSpecs<Event[]>((e: Event) =>
      e.title === 'Excoursion' && e.description.includes(city));
  }

  public static PriceRange(start: number, end: number): DirectSpecs<Event[]> {
    return new DirectSpecs<Event[]>((e: Event) =>
    +e.price > start && +e.price < end);
  }
}
