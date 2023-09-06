import { IUser } from 'types/user';

export interface IAuthPostCredential
  extends Pick<IUser, 'email' | 'password'> {}

export interface IAuthCredential extends Omit<IUser, 'password'> {
  jwt: string;
}
