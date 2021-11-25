export interface IBuilder {

  reset(): IBuilder;
  addFilter(prop: string, value: string): IBuilder;
  getQuery(): Promise<JSON>;

}
