import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdditionalDto } from './dto/create-additional.dto';
import { UpdateAdditionalDto } from './dto/update-additional.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class AdditionalService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.additional.findMany();
  }

  async findOne(uuid_event: string, uuid_user:string) {
    const additional = await this.prisma.additional.findFirst({
      where: { uuid_event: uuid_event, uuid_user: uuid_user },
    });    
    if (!additional) {
      throw new NotFoundException("Usuario não se iscreveu");
    }
    return additional;
  }


}
