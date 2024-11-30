import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { UheModule } from '../user-has-event/uhe.module';
import { AdditionalModule } from 'src/additional/additional.module';

@Module({
  imports: [AdditionalModule, UheModule],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
