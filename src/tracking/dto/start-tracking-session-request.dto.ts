import { IsNumber, IsUUID } from 'class-validator';

export class StartTrackingSessionRequest {
  @IsUUID()
  destinationPlaceId: string;

  @IsNumber()
  distance: number;
}
