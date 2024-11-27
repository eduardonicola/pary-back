// src/event/dto/create-event.dto.ts
import { IsBoolean, IsDateString, IsNotEmpty, IsString, Length } from 'class-validator';
import { name, locate, date_and_time, description, egalitarian } from './rules/event-rules';
import { Transform } from 'class-transformer';

export class CreateEventDto {
  @IsNotEmpty(name.required)
  @IsString(name.typeMatch)
  @Length(2, 255,name.length)
  name: string;

  @IsNotEmpty(locate.required)
  @IsString(locate.typeMatch)
  @Length(5, 255, locate.length)
  locate: string;

  @IsNotEmpty(date_and_time.required)
  @IsDateString({},date_and_time.typeMatch)
  date_and_time: string;

  @IsNotEmpty(date_and_time.required)
  @IsDateString({},date_and_time.typeMatch)
  date_stop_sub: string
  
  @IsNotEmpty(description.required)
  @IsString(description.typeMatch)
  description: string;

  @IsNotEmpty(egalitarian.required)
  @IsBoolean(egalitarian.typeMatch)
  egalitarian: boolean;
}
