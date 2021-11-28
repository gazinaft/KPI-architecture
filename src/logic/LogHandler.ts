import { BaseHandler } from './BaseHandler';
import { IHandler } from './IHandler';

export class LogHandler extends BaseHandler {
  async handle(data) {
    console.log(data);
    return await super.handle(data);
  }

  setNext(h: IHandler) {
    super.setNext(h);
  }
}
