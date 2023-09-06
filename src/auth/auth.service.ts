import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { IAuthCredential, IAuthPostCredential } from 'types/auth';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { BackendPrismaResponseShape } from 'types';
import { IUser } from 'types/user';
import { RegistrationAuthDto } from './dto/registration-auth-dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async findOneWithToken(
    id: number,
  ): Promise<BackendPrismaResponseShape<IAuthCredential>> {
    const data = await this.prisma.users.findFirst({
      where: {
        id,
      },
    });
    const token = this.login(data.id);
    const authUser: IAuthCredential = {
      email: data.email,
      created_at: data.created_at,
      updated_at: data.updated_at,
      id: id,
      ...token,
    };
    return {
      statusCode: 200,
      data: authUser,
    };
  }

  async validateUser({
    email,
    password,
  }: IAuthPostCredential): Promise<BackendPrismaResponseShape<IUser>> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(password, user.data.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
  login(id: number): Pick<IAuthCredential, 'jwt'> {
    // Implement your user authentication logic here
    // If authentication succeeds, generate and return a JWT token
    const payload = { sub: id };
    return {
      jwt: this.jwtService.sign(payload),
    };
  }

  async register(registrationDto: RegistrationAuthDto) {
    const { email, password } = registrationDto;

    // Check if the email is already in use
    const { data } = await this.userService.findByEmail(email);
    if (!!data) {
      throw new ConflictException('Email already in use');
    }

    // Create the new user
    const newUser = await this.userService.createUser({ email, password });

    // Optionally, you can generate and return a JWT token for the new user here
    // For JWT, you can use libraries like @nestjs/jwt
    return newUser;
  }
}
