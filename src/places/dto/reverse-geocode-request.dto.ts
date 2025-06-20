import { IsNumber } from 'class-validator';

export class ReverseGeocodeRequest {
  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}
