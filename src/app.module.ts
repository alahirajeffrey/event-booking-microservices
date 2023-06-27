import { Module } from '@nestjs/common';
import { EmailNotificationModule } from './email-notification/email-notification.module';
import { EmailNotificationController } from './email-notification/email-notification.controller';
import { EmailNotificationService } from './email-notification/email-notification.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [EmailNotificationModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [EmailNotificationController],
  providers: [EmailNotificationService],
})
export class AppModule {}
