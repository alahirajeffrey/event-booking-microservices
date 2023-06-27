import { Body, Controller } from '@nestjs/common';
import { EmailNotificationService } from './email-notification.service';
import { SendOtpEmailDto } from './dto/send-otp.dto';
import { SendEventDetailsEmailDto } from './dto/send-event-details.dto';
import { SendPriceSetorUpdateEmail } from './dto/price-updated.dto';
import { SendBookingDetailsEmailDto } from './dto/send-booking-details.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('email-notification')
export class EmailNotificationController {
  constructor(private readonly emailService: EmailNotificationService) {}

  @MessagePattern({ cmd: 'send-otp' })
  async sendOtpEail(@Body() dto: SendOtpEmailDto) {
    return this.emailService.sendOtpEmail(dto);
  }

  @MessagePattern({ cmd: 'send-event-details' })
  async sendEventDetailsEmail(@Body() dto: SendEventDetailsEmailDto) {
    return this.emailService.sendEventDetailsEmail(dto);
  }

  @MessagePattern({ cmd: 'send-price-update' })
  async sendPriceSetorUpdateEmail(@Body() dto: SendPriceSetorUpdateEmail) {
    return this.emailService.sendPriceSetorUpdateEmail(dto);
  }

  @MessagePattern({ cmd: 'send-booking-details' })
  async sendBookingDetailsEmail(@Body() dto: SendBookingDetailsEmailDto) {
    return this.emailService.sendBookingDetailsEmail(dto);
  }
}
