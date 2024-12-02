import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { SpentService } from './spent.service';
import { CreateSpentDto } from './dto/create-spent.dto';
import { UpdateSpentDto } from './dto/update-spent.dto';

@Controller('spent')
export class SpentController {
  constructor(private readonly spentService: SpentService) {}

  @Post()
  create(@Body() createSpentDto: CreateSpentDto) {
    return this.spentService.create(createSpentDto);
  }

  @Get(':uuid_event')
  findAll(@Param('uuid_event') uuid_event: string) {
    return this.spentService.findAll(uuid_event);
  }

  @Post(':uuid_spent')
  update(@Param('uuid_spent') uuid_spent: string, @Body() updateSpentDto: UpdateSpentDto) {
    return this.spentService.update(uuid_spent, updateSpentDto);
  }

  @Delete(':uudi_spent')
  remove(@Param('uudi_spent') uudi_spent: string) {
    return this.spentService.remove(uudi_spent);
  }
}
