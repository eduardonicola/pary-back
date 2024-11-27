import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Event } from '@prisma/client';
import { MessageStatus } from 'src/responses/router';
import { UheService } from 'src/user-has-event/uhe.service'
import { log } from 'console';
@Injectable()
export class EventService {
  constructor(
    private readonly userHasEvent: UheService,
    private readonly prisma: PrismaService
  ) {}

async create(createEventDto: CreateEventDto, uuid_user: string, ): Promise<Event> {
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
    const uhe = await this.userHasEvent.creat(eventCreated.uuid_event, uuid_user)
    if(uhe){
      return eventCreated;
    }else{
      throw new MessageStatus('não crio a relação user has event')
    }
  }

  findAll(uuid_user: string): Promise<Event[]> {
    return this.prisma.event.findMany({
      where: {
        userHasevent: {
          some: {
            uuid_user: uuid_user, // Filtra apenas os registros do usuário autenticado
          },
        },
      },
      include: {
        userHasevent: {
          where:{
            uuid_user: uuid_user
          },
          select:{
            user_level: true
          }
        },
      },
    }).then(events => {
      // Mapeia para incluir o 'user_level' diretamente
      return events.map(event => ({
        name: event.name,
        locate: event.locate,
        date_and_time: event.date_and_time,
        description: event.description,
        egalitarian: event.egalitarian,
        uuid_event: event.uuid_event,
        userHasevent: event.userHasevent.map(uh => uh.user_level), // Mapeia o array para um array de strings
      }));
    });;
  }

  findOne(uuid_event: string, uuid_user: string): Promise<Event> {
    return this.prisma.event.findUnique({
      where: { uuid_event: uuid_event },
    });
  }

  async update(uuid_event: string, data: UpdateEventDto, uuid_user: string): Promise<Event> {
    try {
      const eventUpdated = await this.prisma.event.update({
        where: { uuid_event: uuid_event },
        data: data,
      });
  
      return eventUpdated;
      
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Evento não encontrado');;
      }
      throw new HttpException(
        'Erro ao atualizar o Evento',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

  }

  async remove(uuid_event: string,  uuid_user: string): Promise<MessageStatus | NotFoundException | HttpException> {
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
