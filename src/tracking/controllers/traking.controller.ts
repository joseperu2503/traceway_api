import { Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { JwtAuth } from 'src/auth/decorators/jwt-auth.decorator';
import { User } from 'src/auth/entities/user.entity';
import { UserPlaceService } from 'src/places/services/user-place.service';
import { StartTrackingSessionRequest } from '../dto/start-tracking-session-request.dto';
import { TrackingService } from '../services/traking.service';

@Controller('traking')
export class TrackingController {
  constructor(
    private readonly trackingService: TrackingService,
    private readonly userPlaceService: UserPlaceService,
  ) {}

  @Post('start')
  @JwtAuth()
  async startTrackingSession(
    @GetUser() user: User,
    @Body() request: StartTrackingSessionRequest,
  ) {
    const userPlace = await this.userPlaceService.findOne(
      user.id,
      request.destinationPlaceId,
    );

    if (!userPlace) {
      throw new NotFoundException('Place not found');
    }

    await this.userPlaceService.update(user.id, request.destinationPlaceId, {
      lastUsedAt: new Date(),
    });

    return this.trackingService.startTrackingSession({
      userId: user.id,
      destinationPlaceId: request.destinationPlaceId,
    });
  }
}
