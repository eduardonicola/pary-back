//Models base da aplicação
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EventModule } from './event/event.module';
import { SpentModule } from './spent/spent.module';
import { AdditionalModule } from './additional/additional.module';
import { UheModule } from './user-has-event/uhe.module';
import { SubscriptionModule } from './subscription/subscription.module';
@Module({
  imports: [
    PrismaModule,
    UserModule,
    EventModule,
    AuthModule,
    SpentModule,
    AdditionalModule,
    UheModule,
    SubscriptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
