import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export interface IUser {
  id: number;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export interface IPrismaUserDataShape
  extends Prisma.Prisma__usersClient<IUser, never, DefaultArgs> {}
