import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { PlacesModule } from 'src/places/places.module';
import { PlaceEntity } from '../places/entities/place.entity';
import { TrackingController } from './controllers/tracking.controller';
import { TrackingSessionStatus } from './entities/tracking-session-status.entity';
import { TrackingSessionEntity } from './entities/tracking-session.entity';
import { TrackingService } from './services/tracking.service';

@Module({
  controllers: [TrackingController],
  providers: [TrackingService],
  imports: [
    TypeOrmModule.forFeature([
      PlaceEntity,
      TrackingSessionEntity,
      TrackingSessionStatus,
    ]),
    AuthModule,
    PlacesModule,
  ],
})
export class TrackingModule {}
