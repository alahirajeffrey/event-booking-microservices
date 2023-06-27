import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import EventStatusEnum from 'src/enums/event-status.enum';

export class SendBookingDetailsEmailDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  to: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  eventTitle: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  location: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  time: Date;

  @ApiProperty()
  paymentId: null | string;

  @IsEnum(EventStatusEnum)
  @IsNotEmpty()
  @ApiProperty()
  subject: EventStatusEnum;
}
