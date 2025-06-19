import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackingSessionStatusEnum } from 'src/common/enums/tracking-session-status.enum';
import { PlaceModel } from 'src/places/models/place-model';
import { PlacesService } from 'src/places/services/places.service';
import { UserPlaceService } from 'src/places/services/user-place.service';
import { Repository } from 'typeorm';
import { TrackingSessionEntity } from '../entities/tracking-session.entity';
import { StartTrackingSessionParams } from '../models/start-tracking-session-params';

@Injectable()
export class TrackingService {
  constructor(
    @InjectRepository(TrackingSessionEntity)
    private readonly trackingSessionRepository: Repository<TrackingSessionEntity>,
    private readonly userPlaceService: UserPlaceService,
    private readonly placesService: PlacesService,
  ) {}

  async startTrackingSession(params: StartTrackingSessionParams) {
    const { userId, destinationPlaceId, distance } = params;
    let place: PlaceModel | null =
      await this.placesService.findOne(destinationPlaceId);

    if (!place) {
      throw new NotFoundException('Place not found');
    }

    let userPlace = await this.userPlaceService.findOne(userId, place.id);

    if (!userPlace) {
      userPlace = await this.userPlaceService.create(userId, place.id);
    }

    const trackingSession = await this.trackingSessionRepository.save({
      userId: params.userId,
      destinationPlaceId: destinationPlaceId,
      startDate: new Date(),
      endDate: null,
      estimatedDateEnd: new Date(),
      statusId: TrackingSessionStatusEnum.IN_PROGRESS,
    });

    await this.userPlaceService.update(userId, place.id, {
      lastUsedAt: trackingSession.startDate,
    });

    return {
      id: trackingSession.id,
      destinationPlace: place,
      startDate: trackingSession.startDate,
      endDate: trackingSession.endDate,
      estimatedDateEnd: trackingSession.estimatedEndDate,
      statusId: trackingSession.statusId,
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
