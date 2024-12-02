import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSpentDto } from './dto/create-spent.dto';
import { UpdateSpentDto } from './dto/update-spent.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { MessageStatus } from 'src/responses/router';
@Injectable()
export class SpentService {
  constructor(private prisma: PrismaService) {}

  async create(createSpentDto: CreateSpentDto) {
    const eventExists = await this.prisma.event.findUnique({
      where: { uuid_event: createSpentDto.uuid_event },
    });
    if (!eventExists) {
      throw new BadRequestException('Evento não encontrado');
    }
    return this.prisma.spent.create({
      data: createSpentDto,
    });
  }

  async findAll(uuid_event: string) {
    const spents = await this.prisma.spent.findMany({
      where: { uuid_event: uuid_event },
    });
    if (spents.length === 0) {
      throw new BadRequestException('Não foi encontrado nenhum gasto');
    }
    return spents;
  }

  async update(id: string, updateSpentDto: UpdateSpentDto) {
    console.log(id, updateSpentDto);
    
    try {
      const updateSpent = await this.prisma.spent.update({
        where: { uuid_spent: id },
        data: {
          amount: updateSpentDto.amount,
          description: updateSpentDto.description,
          value: updateSpentDto.value,
          name: updateSpentDto.name,
          type_spent: updateSpentDto.type_spent,
        }
      });
      return updateSpent;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new BadRequestException('Gasto não encontrado');
      }
      throw new BadRequestException(error.meta.cause);
    }
  }

  async remove(id: string, uuid_event: string, uuid_user: string) {
    const access = await this.prisma.userHasEvent.findFirst({
      where: {
        uuid_event: uuid_event,
        uuid_user: uuid_user,
      },
      select: {
        user_level: true, // Retorna apenas o que for necessário
      },
    });
    const hasAccess = access.user_level !== 'guest'

    if(hasAccess){      
      try {
        await this.prisma.spent.delete({
          where: { uuid_spent: id },
        });
        return new MessageStatus('Gasto deletado com sucesso');
      } catch (error) {
        if (error.code === 'P2025') {
          throw new BadRequestException('Gasto não encontrado');
        }
        throw new BadRequestException(error.meta.cause);
      }
    }
    return new BadRequestException('Sem permição')
  }
}
