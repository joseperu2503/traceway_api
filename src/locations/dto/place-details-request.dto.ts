import { IsString } from 'class-validator';

export class PlaceDetailsRequest {
  @IsString()
  placeId: string;
}
