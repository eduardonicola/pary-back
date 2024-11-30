import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException, HttpException, UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from '@prisma/client';
import { MessageStatus } from 'src/responses/router';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/auth/get-user.decorator';
import { EventFront } from './dto/listevent.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createEventDto: CreateEventDto, @User('uuid_user') userId: string): Promise<Event> {
    return this.eventService.create(createEventDto, userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@User('uuid_user') userId: string): any {
    return this.eventService.findAll(userId);
  }

  @Get(':uuid_event')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('uuid_event') uuid_event: string, @User('uuid_user') userId: string): Promise<EventFront> {
    return this.eventService.findOne(uuid_event,userId);
  }

  @Put(':uuid_event')
  @UseGuards(JwtAuthGuard)
  update(@Param('uuid_event') uuid_event: string, @Body() updateEventDto: UpdateEventDto, @User('uuid_user') userId: string):Promise<Event> {
    return this.eventService.update(uuid_event, updateEventDto, userId);
  }

  @Delete(':uuid_event')
  @UseGuards(JwtAuthGuard)
  remove(@Param('uuid_event') uuid_event: string, @User('uuid_user') userId: string):Promise<MessageStatus | NotFoundException | HttpException> {
    return this.eventService.remove(uuid_event, userId);
  }
}
