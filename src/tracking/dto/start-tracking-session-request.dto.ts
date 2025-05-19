import { IsUUID } from 'class-validator';

export class StartTrackingSessionRequest {
  @IsUUID()
  destinationLocationId: string;
}
