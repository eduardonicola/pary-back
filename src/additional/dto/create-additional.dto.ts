import { IsString, IsEnum, IsBoolean } from 'class-validator';

export class CreateAdditionalDto {

  @IsString()
  uuid_user: string;

  @IsString()
  uuid_event: string;

  @IsBoolean()
  hard_drink: boolean;

  @IsBoolean()
  drink: boolean;

  @IsBoolean()
  food: boolean;

  @IsBoolean()
  pastime: boolean;
}
