import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthDto } from './dto/create-auth.dto';
import { RegistrationAuthDto } from './dto/registration-auth-dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body(ValidationPipe) registrationDto: RegistrationAuthDto) {
    return this.authService.register(registrationDto);
  }
  @Post('login')
  async login(@Body() loginDto: AuthDto) {
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
