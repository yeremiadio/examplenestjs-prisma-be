import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateAuthDto } from './dto/create-auth.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() loginDto: CreateAuthDto) {
    try {
      const user = await this.authService.validateUser({
        email: loginDto.email,
        password: loginDto.password,
      });
      return this.authService.findOneWithToken(user.data.id);
      // Generate and return a JWT token or session token here.
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
