import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException, HttpException, UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from '@prisma/client';
import { MessageStatus } from 'src/responses/router';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return this.eventService.create(createEventDto);
  }

  @Get()
  findAll(): Promise<Event[]> {
    return this.eventService.findAll();
  }

  @Get(':uuid_event')
  findOne(@Param('uuid_event') uuid_event: string): Promise<Event> {
    return this.eventService.findOne(uuid_event);
  }

  @Put(':uuid_event')
  update(@Param('uuid_event') uuid_event: string, @Body() updateEventDto: UpdateEventDto):Promise<Event> {
    return this.eventService.update(uuid_event, updateEventDto);
  }

  @Delete(':uuid_event')
  remove(@Param('uuid_event') uuid_event: string):Promise<MessageStatus | NotFoundException | HttpException> {
    return this.eventService.remove(uuid_event);
  }
}
