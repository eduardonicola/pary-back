import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Additional } from '@prisma/client';

@Injectable()
export class AdditionalService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.additional.findMany();
  }

  async creatAddt(data:  Omit<Additional ,'id'>){
    this.prisma.additional.create({data:data})
  }

  async findOne(uuid_event: string, uuid_user:string) {
    const additional = await this.prisma.additional.findFirst({
      where: { uuid_event: uuid_event, uuid_user: uuid_user },
    });    
    if (!additional) {
      throw new NotFoundException("Usuario não se iscreveu");
    }
    {}
    return {
      id: Number(additional.id),
      hard_drink: additional.hard_drink,
      drink: additional.drink,
      food: additional.food,
      pastime: additional.pastime,
      uuid_user: additional.uuid_user,
      uuid_event: additional.uuid_event,
    };
  }


}
