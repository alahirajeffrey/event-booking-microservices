import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import EventStatusEnum from 'src/enums/event-status.enum';

export class SendEventDetailsEmailDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  to: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  eventId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  location: string;

  @IsEnum(EventStatusEnum)
  @IsNotEmpty()
  @ApiProperty()
  eventStatus: EventStatusEnum;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  time: Date;
}
