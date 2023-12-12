import { IUser } from '.';

export interface ISigninUserToken extends IUser {
  token: string;
}
