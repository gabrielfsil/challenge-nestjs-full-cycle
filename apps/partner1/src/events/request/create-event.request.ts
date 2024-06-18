import { IsString, IsNotEmpty, IsDateString, IsNumber, Min, MaxLength } from 'class-validator';

export class CreateEventRequest {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  description: string;

  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  price: number;
}