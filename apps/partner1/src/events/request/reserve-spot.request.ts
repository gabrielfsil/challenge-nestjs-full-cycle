import { IsArray, IsEnum, IsString, ArrayNotEmpty, IsNotEmpty, IsEmail } from 'class-validator';
import { TicketKind } from '@prisma/client';

export class ReserveSpotRequest {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  spots: string[];

  @IsEnum(TicketKind)
  @IsNotEmpty()
  ticket_kind: TicketKind;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}