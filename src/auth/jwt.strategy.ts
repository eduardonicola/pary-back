import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';   // Serviço de usuários
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrai o token do cabeçalho Authorization
      secretOrKey: 'SECRET_KEY', // Chave secreta usada para assinar/verificar o token
    });
  }

  // Método chamado automaticamente para validar o token JWT
  async validate(payload: JwtPayload) {
    // O payload contém o email e o sub (ID do usuário) a partir do token JWT
    const user = await this.userService.findUser(payload.email);

    if (!user) {
      throw new Error('Usuário não encontrado ou inválido');
    }

    return user;
  }
}
