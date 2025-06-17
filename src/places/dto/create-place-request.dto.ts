import { IsNumber, IsString } from 'class-validator';

export class CreatePlaceRequest {
  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsString()
  mainText: string;

  @IsString()
  secondaryText: string;
}
