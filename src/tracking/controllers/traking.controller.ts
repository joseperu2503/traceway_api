import { Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { JwtAuth } from 'src/auth/decorators/jwt-auth.decorator';
import { User } from 'src/auth/entities/user.entity';
import { PlaceModel } from 'src/places/models/place-model';
import { PlacesService } from 'src/places/services/places.service';
import { UserPlaceService } from 'src/places/services/user-place.service';
import { StartTrackingSessionRequest } from '../dto/start-tracking-session-request.dto';
import { TrackingService } from '../services/traking.service';

@Controller('tracking')
export class TrackingController {
  constructor(
    private readonly trackingService: TrackingService,
    private readonly userPlaceService: UserPlaceService,
    private readonly placesService: PlacesService,
  ) {}

  @Post('start')
  @JwtAuth()
  async startTrackingSession(
    @GetUser() user: User,
    @Body() request: StartTrackingSessionRequest,
  ) {
    let place: PlaceModel | null = await this.placesService.findOne(
      request.destinationPlaceId,
    );

    if (!place) {
      throw new NotFoundException('Place not found');
    }

    let userPlace = await this.userPlaceService.findOne(user.id, place.id);

    if (!userPlace) {
      userPlace = await this.userPlaceService.create(user.id, place.id);
    }

    await this.userPlaceService.update(user.id, place.id, {
      lastUsedAt: new Date(),
    });

    return this.trackingService.startTrackingSession({
      userId: user.id,
      destinationPlace: place,
      distance: request.distance,
    });
  }
}
