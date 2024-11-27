import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';  // Serviço de usuários
import { JwtPayload } from './interfaces/jwt-payload.interface';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly UserService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // Função para validar o usuário durante o login
  async validateUser(userEmail: string, pass: string): Promise<any> {
    const user = await this.UserService.findUser(userEmail);
    if (user && bcrypt.compareSync(pass, user.password)) {
      return user;
    }
    return null;
  }


  async login(user: any) {
    const payload: JwtPayload = { email: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
