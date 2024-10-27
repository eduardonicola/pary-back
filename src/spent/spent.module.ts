import { Module } from '@nestjs/common';
import { SpentService } from './spent.service';
import { SpentController } from './spent.controller';

@Module({
  controllers: [SpentController],
  providers: [SpentService],
})
export class SpentModule {}
