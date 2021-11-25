export interface ISpec<T> {

  isSatisfiedBy(entity: T): boolean;

}
