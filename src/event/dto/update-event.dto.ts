import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './create-event.dto';
import { IsDateString } from 'class-validator';
import { date_and_time } from './rules/event-rules';

export class UpdateEventDto extends PartialType(CreateEventDto) {
  name?: string;
  locate?: string;
  @IsDateString({}, date_and_time.typeMatch)
  date_and_time?: string;
  date_stop_sub?: string;
  description?: string;
  egalitarian?: boolean;
}
