import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Event } from '@prisma/client';
import { MessageStatus } from 'src/responses/router';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}

async create(createEventDto: CreateEventDto): Promise<Event> {

    const { name, locate, date_and_time, description, egalitarian } = createEventDto;
    const eventCreated = await this.prisma.event.create({
      data: {
        name,
        locate,
        date_and_time, 
        description,
        egalitarian, 
      },
    });
    
    return eventCreated;
  }

  findAll(): Promise<Event[]> {
    return this.prisma.event.findMany();
  }

  findOne(uuid_event: string): Promise<Event> {
    return this.prisma.event.findUnique({
      where: { uuid_event: uuid_event },
    });
  }

  async update(uuid_event: string, data: UpdateEventDto): Promise<Event> {
    try {
      const eventUpdated = await this.prisma.event.update({
        where: { uuid_event: uuid_event },
        data: data,
      });
  
      return eventUpdated;
      
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Evvento não encontrado');;
      }
      throw new HttpException(
        'Erro ao atualizar o Evento',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

  }

  async remove(uuid_event: string): Promise<MessageStatus | NotFoundException | HttpException> {
    try{
      const eventDeleted = await this.prisma.event.delete({
        where: { uuid_event: uuid_event },
      });
      if(eventDeleted){
        return  new MessageStatus('Evento deletado com sucesso');
      }

    }catch(error){
      if (error.code === 'P2025') {
        throw new NotFoundException('Evvento não encontrado');
      }
      throw new HttpException(
        'Erro ao deletar o Evento',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    
  }
}
