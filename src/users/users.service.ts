import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users: string[] = ['User1', 'User2', 'User3'];

  findAll(): string[] {
    return this.users;
  }
}
