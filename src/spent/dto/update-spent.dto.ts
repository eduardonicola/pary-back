import { PartialType } from '@nestjs/mapped-types';
import { CreateSpentDto } from './create-spent.dto';
import { TypeSpent } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsDecimal } from 'class-validator';
import { value } from './rules/creat-spent';

export class UpdateSpentDto extends PartialType(CreateSpentDto) {
  name?: string;
  description?: string;
  @IsDecimal({ decimal_digits: '2',force_decimal: true }, value.isDecimal)
  value?: string;
  amount?: number;
  type_spent?: TypeSpent;
  
  @Exclude()
  uuid_event: string;
}
