import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { CreateUserDto } from './dtos/creat-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    const hashPassword = await bcrypt.hash(data.password, 10);

    return await this.prisma.user
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
  }

  async getUser(uuid_user: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { uuid_user } });
  }

  async updateUser(
    uuid_user: string,
    data: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.prisma.user.update({ where: { uuid_user }, data });
  }
}
