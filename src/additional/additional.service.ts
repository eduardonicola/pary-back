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

  async findOne(id: number) {
    const additional = await this.prisma.additional.findUnique({ where: { id } });
    if (!additional) {
      throw new NotFoundException(`Additional with ID ${id} not found`);
    }
    return additional;
  }

  async create(data: CreateAdditionalDto) {
    return this.prisma.additional.create({ data });
  }

  async update(id: number, data: UpdateAdditionalDto) {
    await this.findOne(id); // Garantir que o additional existe
    return this.prisma.additional.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Garantir que o additional existe
    return this.prisma.additional.delete({ where: { id } });
  }
}
