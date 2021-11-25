import { ISpec } from './ISpec';

export class DirectSpecs<T> implements ISpec<T> {

  private readonly func: (T) => boolean;

  constructor(func: (T) => boolean) {
    this.func = func;
  }

  isSatisfiedBy(entity: T): boolean {
    return this.func(entity);
  }
}
