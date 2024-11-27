import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserHasEvent } from '@prisma/client';

@Injectable()
export class UheService {
  constructor(private readonly prisma: PrismaService){}

  async creat(uuid_event: string, uuid_user: string) {
    try {
     const uhe = this.prisma.userHasEvent.create({
      
        data:{
          uuid_event: uuid_event,
          uuid_user: uuid_user,
          user_level: "owner",
        }
      })
      return uhe
    } catch (error) {
      return error
    }

  }
  
}
