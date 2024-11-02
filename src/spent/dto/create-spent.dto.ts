import { IsString, IsOptional, IsDecimal, IsInt, IsUUID, IsEnum } from 'class-validator';
import { TypeSpent } from '@prisma/client';
import { value } from './rules/creat-spent';

export class CreateSpentDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDecimal({ decimal_digits: '2',force_decimal: true }, value.isDecimal)
  value: string;

  @IsInt()
  amount: number;

  @IsEnum(TypeSpent)
  type_spent: TypeSpent;

  @IsUUID()
  uuid_event: string;
}
