import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import EventStatusEnum from 'src/enums/event-status.enum';
import QRCode from 'qrcode';

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

  /**
   * function to send otp email
   * @param to : email of the reciepient
   * @param otp : otp to be sent
   */
  async sendOtpEmail(to: string, otp: string) {
    const mailOptions = {
      from: 'alahirajeffrey@gmail.com',
      to: to,
      subject: 'Verification Otp',
      text: `Hi there, Here is your verification otp ${otp}`,
    };

    await this.nodeMailerTransport
      .sendMail(mailOptions)
      .then((response) => {
        console.log(`Email sent: ${response.response}`);
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }

  /**
   * function to send event details
   * @param to : email of the reciepient
   * @param eventId : id of the event
   * @param time : date and time of the event
   * @param location : location of the  event
   * @param eventStatus : status of the event i.e created, updated, deleted
   */
  sendEventDetailsEmail = async (
    to: string,
    eventId: string,
    time: Date,
    location: string,
    eventStatus: EventStatusEnum,
  ) => {
    const mailOptions = {
      from: 'alahirajeffrey@gmail.com',
      to: to,
      subject: `Event ${eventStatus}`,
      text: `Hi there, Your event has been ${eventStatus}. 
    
            Event id : ${eventId}
            
            Time: ${time}
            
            location: ${location}`,
    };

    await this.nodeMailerTransport
      .sendMail(mailOptions)
      .then((response) => {
        console.log(`Email sent: ${response.response}`);
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  };

  /**
   * function to send otp email
   * @param to : email of the reciepient
   * @param eventId : id of the event
   */
  sendPriceSetorUpdateEmail = async (to: string, eventId: string) => {
    const mailOptions = {
      from: 'alahirajeffrey@gmail.com',
      to: to,
      subject: 'Seat Price Updated',
      text: `Hi there, 
    
    The seat price for your event with id: ${eventId} has been updated.`,
    };

    await this.nodeMailerTransport
      .sendMail(mailOptions)
      .then((response) => {
        console.log(`Email sent: ${response.response}`);
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  };

  /**
   * send booking details via email
   * @param to : reciever email
   * @param eventTitle : title of the event
   * @param time : time of the event
   * @param location : location of the event
   * @param paymentId : payment id if the event is paid or null if it is free
   */
  sendBookingEmail = async (
    to: string,
    eventTitle: string,
    time: Date,
    location: string,
    paymentId: string | null,
    subject: EventStatusEnum,
  ) => {
    const emailString = `${eventTitle} booked. \nEvent date: ${time}. \nLocation: ${location}. \nPaymentId: ${paymentId}`;

    const qrcEncodedMessage = await QRCode.toDataURL(emailString);

    const mailOptions = {
      from: 'alahirajeffrey@gmail.com',
      to: to,
      subject: `Booking ${subject}`,
      attachDataUrls: true,
      html: `<p>Scan the QR code to view your booking details</p>
          <br>
          <img src=${qrcEncodedMessage}>`,
    };

    await this.nodeMailerTransport
      .sendMail(mailOptions)
      .then((response) => {
        console.log(`Email sent: ${response.response}`);
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  };
}
