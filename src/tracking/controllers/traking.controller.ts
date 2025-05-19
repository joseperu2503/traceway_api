import { Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { JwtAuth } from 'src/auth/decorators/jwt-auth.decorator';
import { User } from 'src/auth/entities/user.entity';
import { UserLocationService } from 'src/locations/services/user-location.service';
import { StartTrackingSessionRequest } from '../dto/start-tracking-session-request.dto';
import { TrackingService } from '../services/traking.service';

@Controller('traking')
export class TrackingController {
  constructor(
    private readonly trackingService: TrackingService,
    private readonly userLocationService: UserLocationService,
  ) {}

  @Post('start')
  @JwtAuth()
  async startTrackingSession(
    @GetUser() user: User,
    @Body() request: StartTrackingSessionRequest,
  ) {
    const userLocation = await this.userLocationService.findOne(
      user.id,
      request.destinationLocationId,
    );

    if (!userLocation) {
      throw new NotFoundException('Location not found');
    }

    await this.userLocationService.update(
      user.id,
      request.destinationLocationId,
      {
        lastUsedAt: new Date(),
      },
    );

    return this.trackingService.startTrackingSession({
      userId: user.id,
      destinationLocationId: request.destinationLocationId,
    });
  }
}
