import { IsNumber } from 'class-validator';

export class GeocodeRequest {
  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}
