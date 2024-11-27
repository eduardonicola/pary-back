import { BadRequestException, Injectable } from '@nestjs/common';
import { log } from 'console';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubscriptionService {
  constructor( private readonly prisma: PrismaService) {}

  async creatSub(uuid_event: string, uuid_user: string) {
    const event = await this.prisma.event.findUnique({
      where: { uuid_event: uuid_event },
      include:{
        userHasevent: true
      }
    })  
    if (!event) {
      throw new BadRequestException('Evento não encontrado');
    }
    const currentDate = new Date();

    // Verificando se a data de término das inscrições já passou
    if (new Date(event.date_stop_sub) < currentDate) {
      throw new BadRequestException('O período de inscrições já terminou');
    }
    // Verificando se o usuário já está inscrito
    const isUserAlreadyEnrolled = event.userHasevent.some(
      (userEvent) => userEvent.uuid_user === uuid_user, // Verifica se o uuid_user já está na lista
    );

    if (isUserAlreadyEnrolled) {
      throw new BadRequestException('Usuário já está inscrito neste evento');
    }

    try {
     const uhe = this.prisma.userHasEvent.create({
      
        data:{
          uuid_event: uuid_event,
          uuid_user: uuid_user,
          user_level: "guest",
        }
      })
      return uhe
    } catch (error) {
      return error
    }

  }
}
