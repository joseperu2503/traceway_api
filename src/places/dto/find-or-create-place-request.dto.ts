import { IsNumber, IsString } from 'class-validator';

export class FindOrCreatePlaceRequest {
  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsString()
  mainText: string;

  @IsString()
  secondaryText: string;
}
