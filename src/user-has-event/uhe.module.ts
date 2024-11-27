import { Module } from '@nestjs/common';
import { UheService } from './uhe.service';

@Module({
  providers: [UheService],
  exports: [UheService], 
})
export class UheModule {}
