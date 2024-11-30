import { Controller, Get, Param, UseGuards, } from '@nestjs/common';
import { AdditionalService } from './additional.service';
import { ResponseAdditionalDto } from './dto/response-additional.dto';
import { User } from 'src/auth/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('additional')
export class AdditionalController {
  constructor(private readonly additionalService: AdditionalService) {}


  @Get(':uuid_event')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('uuid_event') uuid_event: string ,@User('uuid_user') uuid_user: string ): Promise<ResponseAdditionalDto> {    
    return this.additionalService.findOne(uuid_event, uuid_user);
  }
}
