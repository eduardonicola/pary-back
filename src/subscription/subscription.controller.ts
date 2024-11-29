import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/auth/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SubscriptionService } from './subscription.service';
import { Additional } from './dto/subuscription.dto';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService ){} 

  @Post(":uuid_event")
  @UseGuards(JwtAuthGuard)
  subscrib(@Body() additional: Additional ,@Param('uuid_event') uuid_event: string, @User('uuid_user') userId: string){
    return this.subscriptionService.creatSub(uuid_event, userId, additional)
  }
}
