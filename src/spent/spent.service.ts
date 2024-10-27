import { Injectable } from '@nestjs/common';
import { CreateSpentDto } from './dto/create-spent.dto';
import { UpdateSpentDto } from './dto/update-spent.dto';

@Injectable()
export class SpentService {
  create(createSpentDto: CreateSpentDto) {
    return 'This action adds a new spent';
  }

  findAll() {
    return `This action returns all spent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} spent`;
  }

  update(id: number, updateSpentDto: UpdateSpentDto) {
    return `This action updates a #${id} spent`;
  }

  remove(id: number) {
    return `This action removes a #${id} spent`;
  }
}
