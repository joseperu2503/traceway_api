import { IsString } from 'class-validator';

export class PlaceDetailsRequest {
  @IsString()
  resultId: string;
}
