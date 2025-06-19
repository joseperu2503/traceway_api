import { IsUUID } from 'class-validator';

export class CompleteTrackingSessionRequest {
  @IsUUID()
  trackingSessionId: string;
}
