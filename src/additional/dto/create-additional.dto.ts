import { IsString, IsEnum } from 'class-validator';
import { TypeAdditional } from '@prisma/client'; // Importe o Enum de TypeAdditional

export class CreateAdditionalDto {
  @IsEnum(TypeAdditional)
  type_additional: TypeAdditional;

  @IsString()
  value_additional: string;

  @IsString()
  uuid_user: string;

  @IsString()
  uuid_event: string;
}
