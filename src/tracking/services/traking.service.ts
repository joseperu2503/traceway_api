import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackingSession } from '../entities/tracking-session.entity';
import { StartTrackingSessionParams } from '../models/start-tracking-session-params.interface';

@Injectable()
export class TrackingService {
  constructor(
    @InjectRepository(TrackingSession)
    private readonly trackingSessionRepository: Repository<TrackingSession>,
  ) {}

  async startTrackingSession(params: StartTrackingSessionParams) {
    const trackingSession = await this.trackingSessionRepository.save({
      userId: params.userId,
      destinationPlaceId: params.destinationPlace.id,
      startDate: new Date(),
      endDate: null,
      estimatedDateEnd: new Date(),
    });
    return {
      id: trackingSession.id,
      destinationPlace: params.destinationPlace,
      startDate: trackingSession.startDate,
      endDate: trackingSession.endDate,
      estimatedDateEnd: trackingSession.estimatedDateEnd,
    };
  }
}
