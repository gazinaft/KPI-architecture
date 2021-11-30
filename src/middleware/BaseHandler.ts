import { IHandler } from './IHandler';

export class BaseHandler implements IHandler {

  private next: IHandler = null;

  async handle(evts): Promise<any> {
    if (this.next != null) {
      return this.next.handle(evts);
    }
  }

  setNext(h: IHandler) {
    this.next = h;
  }
}
