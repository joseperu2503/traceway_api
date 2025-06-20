import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackingSessionStatusEnum } from 'src/common/enums/tracking-session-status.enum';
import { PlaceModel } from 'src/places/models/place-model';
import { PlacesService } from 'src/places/services/places.service';
import { UserPlaceService } from 'src/places/services/user-place.service';
import { Repository } from 'typeorm';
import { TrackingSessionEntity } from '../entities/tracking-session.entity';
import { StartTrackingSessionParams } from '../models/start-tracking-session-params';
import { TrackingSessionModel } from '../models/tracking-session-model';

@Injectable()
export class TrackingService {
  constructor(
    @InjectRepository(TrackingSessionEntity)
    private readonly trackingSessionRepository: Repository<TrackingSessionEntity>,
    private readonly userPlaceService: UserPlaceService,
    private readonly placesService: PlacesService,
  ) {}

  async startTrackingSession(
    params: StartTrackingSessionParams,
  ): Promise<TrackingSessionModel> {
    const { userId, destinationPlaceId, radius: distance } = params;
    let place: PlaceModel | null =
      await this.placesService.findOne(destinationPlaceId);

    if (!place) {
      throw new NotFoundException('Place not found');
    }

    const trackingSession = await this.trackingSessionRepository.save({
      userId: params.userId,
      destinationPlaceId: destinationPlaceId,
      startDate: new Date(),
      endDate: null,
      estimatedDateEnd: new Date(),
      statusId: TrackingSessionStatusEnum.IN_PROGRESS,
      radius: distance,
    });

    await this.userPlaceService.registerUsage(
      userId,
      place.id,
      trackingSession.startDate,
    );

    return {
      id: trackingSession.id,
      destinationPlace: place,
      startDate: trackingSession.startDate,
      endDate: trackingSession.endDate,
      estimatedEndDate: trackingSession.estimatedEndDate,
      statusId: trackingSession.statusId,
      radius: trackingSession.radius,
    };
  }

  async completeTrackingSession(trackingSessionId: string, userId: string) {
    await this.trackingSessionRepository.update(
      { id: trackingSessionId, userId: userId },
      { endDate: new Date(), statusId: TrackingSessionStatusEnum.COMPLETED },
    );

    return { message: 'Tracking session completed successfully' };
  }

  async cancelTrackingSession(trackingSessionId: string, userId: string) {
    await this.trackingSessionRepository.update(
      { id: trackingSessionId, userId: userId },
      { endDate: new Date(), statusId: TrackingSessionStatusEnum.CANCELLED },
    );

    return { message: 'Tracking session cancelled successfully' };
  }

  async getCurrentTrackingSession(userId: string) {
    const trackingSession = await this.trackingSessionRepository.findOne({
      where: {
        userId: userId,
        statusId: TrackingSessionStatusEnum.IN_PROGRESS,
      },
      relations: {
        destinationPlace: true,
      },
    });

    return {
      trackingSession,
    };
  }
}
