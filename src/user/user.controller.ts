import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, User } from '@prisma/client';
import { CreateUserDto } from './dtos/creat-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get(':uuid_user')
  async getUser(@Param('uuid_user') uuid_user: string): Promise<User | null> {
    return this.userService.getUser(uuid_user);
  }

  @Put(':uuid_user')
  async updateUser(@Param('uuid_user') uuid_user: string, @Body() data: Prisma.UserUpdateInput): Promise<User> {
    return this.userService.updateUser(uuid_user, data);
  }

}
