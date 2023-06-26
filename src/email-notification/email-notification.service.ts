import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';

@Injectable()
export class EmailNotificationService {
  private nodeMailerTransport: Mail;
  constructor(private readonly configService: ConfigService) {
    //setup mail service provider
    this.nodeMailerTransport = createTransport({
      service: configService.get('EMAIL_SERVICE'),
      auth: {
        type: 'OAuth2',
        user: configService.get('USER_EMAIL'),
        clientId: configService.get('EMAIL_CLIENT_ID'),
        clientSecret: configService.get('EMAIL_CLIENT_SECRET'),
        refreshToken: configService.get('EMAIL_REFRESH_TOKEN'),
      },
    });
  }
  sendMail(options: Mail.Options) {
    return this.nodeMailerTransport.sendMail(options);
  }
}
