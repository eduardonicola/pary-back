import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { AdditionalService } from './additional.service';
import { CreateAdditionalDto } from './dto/create-additional.dto';
import { UpdateAdditionalDto } from './dto/update-additional.dto';
import { ResponseAdditionalDto } from './dto/response-additional.dto';

@Controller('additional')
export class AdditionalController {
  constructor(private readonly additionalService: AdditionalService) {}

  @Get()
  async findAll(): Promise<ResponseAdditionalDto[]> {
    return this.additionalService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponseAdditionalDto> {
    return this.additionalService.findOne(id);
  }

  @Post()
  async create(@Body() createAdditionalDto: CreateAdditionalDto): Promise<ResponseAdditionalDto> {
    const additional = await this.additionalService.create(createAdditionalDto);
    return additional;
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAdditionalDto: UpdateAdditionalDto,
  ): Promise<ResponseAdditionalDto> {
    return this.additionalService.update(id, updateAdditionalDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.additionalService.remove(id);
  }
}
