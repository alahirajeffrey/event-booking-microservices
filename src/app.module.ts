import { Module } from '@nestjs/common';
import { EmailNotificationModule } from './email-notification/email-notification.module';

@Module({
  imports: [EmailNotificationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
