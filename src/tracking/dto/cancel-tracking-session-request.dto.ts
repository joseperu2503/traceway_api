import { IsUUID } from 'class-validator';

export class CancelTrackingSessionRequest {
  @IsUUID()
  trackingSessionId: string;
}
