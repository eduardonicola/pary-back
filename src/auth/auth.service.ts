import { BadRequestException, Injectable } from '@nestjs/common';
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
    try {
      const user = await this.UserService.findUser(userEmail);
      if (user && bcrypt.compareSync(pass, user.password)) {    
        return user;
      }
      throw new BadRequestException({
        error: 'Bad Request',
        message: ['Erro ao validar o usuário e senha'],
        statusCode: 400,
      });
      
    } catch (error) {
      throw new BadRequestException({
        error: 'Bad Request',
        message: ['Erro ao validar o usuário e senha'],
        statusCode: 400,
      });
    }
  }


  async login(user: any) {
    const payload: JwtPayload = { email: user.email, sub: user.uuid_user };
    return {
      email: user.email, 
      access_token: this.jwtService.sign(payload),
      uuid_user: user.uuid_user
    };
  }
}
