import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dtos/user/creat-user.dto';
import * as bcrypt from 'bcrypt';
import { MessageStatus } from '../responses/router';
import { UserAplicationClient } from './dtos/user/userClient.dto';
import { log } from 'console';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<MessageStatus> {
    const hashPassword = await bcrypt.hash(data.password, 10);

    await this.prisma.user
      .create({
        data: {
          ...data,
          password: hashPassword,
        },
      })
      .catch(async (error) => {
        if (error.code === 'P2002' && error.meta?.target.includes('email')) {
          throw new ConflictException('Usuario já cadastrado');
        }
        throw error;
      });

    return new MessageStatus('Usuaior criado com sucesso');
  }

  async findUser(email: string,): 
    Promise<UserAplicationClient | null> {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });
      if (user) {
        return user;
      }
      throw new NotFoundException('Usuário não encontrado');;
  }

}
