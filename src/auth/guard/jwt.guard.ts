import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWT } from 'config';

@Injectable()
export class JwtAuthGuard extends AuthGuard(JWT) {}
