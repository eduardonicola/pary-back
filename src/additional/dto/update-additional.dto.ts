import { IsOptional, IsString, IsEnum, IsBoolean } from 'class-validator';

export class UpdateAdditionalDto {
  @IsOptional()
  @IsString()
  uuid_user?: string;

  @IsOptional()
  @IsString()
  uuid_event?: string;

  @IsOptional()
  @IsBoolean()
  hard_drink: boolean;

  @IsOptional()
  @IsBoolean()
  drink: boolean;

  @IsOptional()
  @IsBoolean()
  food: boolean;

  @IsOptional()
  @IsBoolean()
  pastime: boolean;
}
