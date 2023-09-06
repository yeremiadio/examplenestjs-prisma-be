import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { BackendPrismaResponseShape } from 'types';
import { IPrismaUserDataShape, IUser } from 'types/user';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<BackendPrismaResponseShape<IPrismaUserDataShape>> {
    const user = createUserDto;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    const newUser = this.prisma.users.create({ data: user });
    return {
      statusCode: 201,
      data: newUser,
    };
  }
  async findByEmail(email: string): Promise<BackendPrismaResponseShape<IUser>> {
    const data = await this.prisma.users.findFirst({
      where: {
        email,
      },
    });
    return {
      statusCode: 200,
      data: data,
    };
  }
}
