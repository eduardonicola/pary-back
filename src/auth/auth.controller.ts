import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';  // DTO de login

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Rota de login
  @Post('login')
  async login(@Body() loginDto: LoginDto) {

    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return this.authService.login(user);
  }
}
