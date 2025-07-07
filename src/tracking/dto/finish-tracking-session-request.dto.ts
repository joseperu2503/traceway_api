import { IsUUID } from 'class-validator';

export class FinishTrackingSessionRequest {
  @IsUUID()
  trackingSessionId: string;
}
