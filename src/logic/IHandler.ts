export interface IHandler {
  handle(evts): void;
  setNext(h: IHandler);
}
