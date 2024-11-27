import { IsOptional, IsString, IsEnum } from 'class-validator';
import { TypeAdditional } from '@prisma/client';

export class UpdateAdditionalDto {
  @IsOptional()
  @IsEnum(TypeAdditional)
  type_additional?: TypeAdditional;

  @IsOptional()
  @IsString()
  value_additional?: string;

  @IsOptional()
  @IsString()
  uuid_user?: string;

  @IsOptional()
  @IsString()
  uuid_event?: string;
}
