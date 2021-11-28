import { BaseHandler } from './BaseHandler';
import { IHandler } from './IHandler';

const login = 'login';
const passwd = 'psw'

export class AuthHandler extends BaseHandler {
  async handle(evts): Promise<any> {
    if (evts.login != login || evts.psw != passwd)
      return Promise.reject('Wrong password or user');
    return await super.handle(evts);
  }

  setNext(h: IHandler) {
    super.setNext(h);
  }
}
