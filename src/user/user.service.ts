import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dtos/user/creat-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dtos/user/update-user.dto';
import { MessageStatus } from './dtos/responses/router-user';
import { UserAplicationClient } from './dtos/user/userClient.dto';
import { plainToInstance, TransformPlainToInstance } from 'class-transformer';

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

  async getUser(uuid_user: string,): 
    Promise<UserAplicationClient | MessageStatus> {
      const user = await this.prisma.user.findUnique({
        where: { uuid_user },
        select: {
          uuid_user: true,
          name: true,
          phone: true,
          email: true,
          password: false,
        },
      });
      if (user) {
        return user;
      }
      throw new NotFoundException('Usuário não encontrado');;
  }

  async updateUser(uuid_user: string, data: UpdateUserDto): Promise<UserAplicationClient | MessageStatus> {

    try {
      const user = await this.prisma.user.update({ where: { uuid_user }, data })  

      return plainToInstance(UserAplicationClient, user, { excludeExtraneousValues: true });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Usuário não encontrado');
      }
      throw new HttpException(
        'Erro ao atualizar o usuário',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
