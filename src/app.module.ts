import { Module } from '@nestjs/common';
import { EmailNotificationModule } from './email-notification/email-notification.module';
import { EmailNotificationController } from './email-notification/email-notification.controller';
import { EmailNotificationService } from './email-notification/email-notification.service';

@Module({
  imports: [EmailNotificationModule],
  controllers: [EmailNotificationController],
  providers: [EmailNotificationService],
})
export class AppModule {}
