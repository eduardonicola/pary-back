import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessageStatus } from 'src/responses/router';
import { UheService } from 'src/user-has-event/uhe.service';
import { EventFront } from './dto/listevent.dto';
import { Event } from '@prisma/client';
import { AdditionalService } from 'src/additional/additional.service';

@Injectable()
export class EventService {
  constructor(
    private readonly userHasEvent: UheService,
    private readonly additiona: AdditionalService,
    private readonly prisma: PrismaService,
  ) {}

  async create(
    createEventDto: CreateEventDto,
    uuid_user: string,
  ): Promise<Event> {
    const {
      name,
      locate,
      date_and_time,
      description,
      egalitarian,
      date_stop_sub,
    } = createEventDto;
    const eventCreated = await this.prisma.event.create({
      data: {
        name,
        locate,
        date_and_time,
        date_stop_sub,
        description,
        egalitarian,
      },
    });
    const uhe = await this.userHasEvent.creat(
      eventCreated.uuid_event,
      uuid_user,
    );
    const addt =  await this.additiona.creatAddt({
      uuid_event: eventCreated.uuid_event,
      uuid_user: uuid_user,
      hard_drink: true,
      drink: true,
      food: true,
      pastime: true,
    });
    if (uhe && addt) {
      return eventCreated;
    } else {
      throw new MessageStatus('não crio a relação user has event');
    }
  }

  async findAll(uuid_user: string): Promise<Partial<EventFront[]>> {
    const list = await this.prisma.event
      .findMany({
        where: {
          userHasevent: {
            some: {
              uuid_user: uuid_user, // Filtra apenas os registros do usuário autenticado
            },
          },
        },
        include: {
          userHasevent: {
            include: {
              user: true,
            },
          },
          spents: {
            select: {
              uuid_spent: true,
              description: true,
              amount: true,
              value: true,
              type_spent: true,
            },
          },
        },
      })
      .then((events) => {
        // Mapeia para incluir o 'user_level' diretamente
        return events.map((event) => ({
          name: event.name,
          locate: event.locate,
          date_and_time: event.date_and_time.toISOString(),
          description: event.description,
          egalitarian: event.egalitarian,
          uuid_event: event.uuid_event,
          date_stop_sub: event.date_stop_sub.toISOString(),
          userLevel: event.userHasevent.find((uh) => uh.uuid_user == uuid_user)
            .user_level,
          participants: event.userHasevent
            .map((participant) => {
              if (participant.uuid_user !== uuid_user) {
                return {
                  uuid_user: participant.uuid_user,
                  name: participant.user.name,
                };
              }
              return null;
            })
            .filter((item) => item !== null),
          spent: event.spents,
        }));
      });

    return list;
  }

  async findOne(uuid_event: string, uuid_user: string): Promise<EventFront> {
    const hasAccess = await this.prisma.userHasEvent.findFirst({
      where: {
        uuid_event: uuid_event,
        uuid_user: uuid_user,
      },
      select: {
        uuid_event: true, // Retorna apenas o que for necessário
      },
    });

    if (!hasAccess) {
      throw new Error('Acesso negado ou evento não encontrado.');
    }
    const uniqEvent = await this.prisma.event
      .findUnique({
        where: { uuid_event: uuid_event },
        include: {
          spents: true,
          userHasevent: {
            include: {
              user: true,
            },
          },
        },
      })
      .then((callBackEvent) => {
        return {
          name: callBackEvent.name,
          locate: callBackEvent.locate,
          date_and_time: callBackEvent.date_and_time.toISOString(),
          description: callBackEvent.description,
          egalitarian: callBackEvent.egalitarian,
          uuid_event: callBackEvent.uuid_event,
          date_stop_sub: callBackEvent.date_stop_sub.toISOString(),
          userLevel: callBackEvent.userHasevent.find(
            (uh) => uh.uuid_user == uuid_user,
          ).user_level,
          participants: callBackEvent.userHasevent
            .map((participant) => {
              if (participant.uuid_user !== uuid_user) {
                return {
                  uuid_user: participant.uuid_user,
                  name: participant.user.name,
                  user_level: participant.user_level
                };
              }
              return null;
            })
            .filter((item) => item !== null),
          spent: callBackEvent.spents,
        };
      });
    return uniqEvent;
  }

  async update(
    uuid_event: string,
    data: UpdateEventDto,
    uuid_user: string,
  ): Promise<Event> {
    try {
      const eventUpdated = await this.prisma.event.update({
        where: { uuid_event: uuid_event },
        data: data,
      });

      return eventUpdated;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Evento não encontrado');
      }
      throw new HttpException(
        'Erro ao atualizar o Evento',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(
    uuid_event: string,
    uuid_user: string,
  ): Promise<MessageStatus | NotFoundException | HttpException> {
    try {
      const eventDeleted = await this.prisma.event.delete({
        where: { uuid_event: uuid_event },
      });
      if (eventDeleted) {
        return new MessageStatus('Evento deletado com sucesso');
      }
    } catch (error) {
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
