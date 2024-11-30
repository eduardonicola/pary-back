import { Module } from '@nestjs/common';
import { AdditionalController } from './additional.controller';
import { AdditionalService } from './additional.service';

@Module({
  controllers: [AdditionalController],
  providers: [AdditionalService],
  exports:[AdditionalService]
})
export class AdditionalModule {}
