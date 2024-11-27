import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/user/creat-user.dto';
import { MessageStatus } from '../responses/router';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createUser(@Body() data: CreateUserDto): Promise<MessageStatus> {
    return this.userService.create(data);
  }

}
