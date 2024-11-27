import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dtos/user/creat-user.dto';
import { UpdateUserDto } from './dtos/user/update-user.dto';
import { MessageStatus } from '../responses/router';
import { UserAplicationClient } from './dtos/user/userClient.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createUser(@Body() data: CreateUserDto): Promise<MessageStatus> {
    return this.userService.create(data);
  }

}
