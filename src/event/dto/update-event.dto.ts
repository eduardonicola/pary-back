import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './create-event.dto';
import { IsDateString, IsOptional } from 'class-validator';
import { date_and_time } from './rules/event-rules';

export class UpdateEventDto extends PartialType(CreateEventDto) {
  name?: string;
  locate?: string;
  @IsOptional(date_and_time.required)
  @IsDateString({}, date_and_time.typeMatch)
  date_and_time: string;
  description?: string;
  egalitarian?: boolean;
}
