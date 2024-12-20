import { BadRequestException, Injectable } from '@nestjs/common';
import { log } from 'console';
import { PrismaService } from 'src/prisma/prisma.service';
import { Additional } from './dto/subuscription.dto';
import { Participant } from 'src/event/dto/listevent.dto';

@Injectable()
export class SubscriptionService {
  constructor( private readonly prisma: PrismaService) {}

  async creatSub(uuid_event: string, uuid_user: string, additional : Additional) {
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
     const uhe = await this.prisma.userHasEvent.create({  
        data:{
          uuid_event: uuid_event,
          uuid_user: uuid_user,
          user_level: "guest",
        }
      })

      const creatAddt = await this.prisma.additional.create({
        data:{
          uuid_event: uuid_event,
          uuid_user: uuid_user,
          hard_drink: additional.hard_drink,
          drink: additional.drink,
          food: additional.food,
          pastime: additional.pastime,
        }
      })

      if(creatAddt.id && uhe.id ){
        return { subscribe: 'Particiopando' }
      }
    } catch (error) {
      return error
    }

  }

  async editLevel(data: Participant, uuid_event: string, userLoged: string){
    const logedLevel = await this.prisma.userHasEvent.findFirstOrThrow({
      where:{
        uuid_event: uuid_event,
        uuid_user: userLoged, 
      }
    })
    console.log();
    
    const hasOwner = logedLevel.user_level === "owner"

    if(hasOwner){
      try {
        const updatedItem = await this.prisma.userHasEvent.update({
          where: {
            uuid_user_uuid_event: {
              uuid_user: data.uuid_user,
              uuid_event: uuid_event,
            },
          },
        
          data: {
            user_level: data.user_level // Atualizando apenas o campo 'user_level'
          }
        });
    
        return updatedItem;
      } catch (error) {
        console.error("Erro ao atualizar:", error);
      }
    
    }
    throw new BadRequestException('Não tem permição')
  }
}
