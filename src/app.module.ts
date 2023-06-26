import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailNotificationModule } from './email-notification/email-notification.module';

@Module({
  imports: [EmailNotificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
