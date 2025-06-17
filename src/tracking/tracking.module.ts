import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { PlacesModule } from 'src/places/places.module';
import { Place } from '../places/entities/place.entity';
import { TrackingController } from './controllers/traking.controller';
import { TrackingSession } from './entities/tracking-session.entity';
import { TrackingService } from './services/traking.service';

@Module({
  controllers: [TrackingController],
  providers: [TrackingService],
  imports: [
    TypeOrmModule.forFeature([Place, TrackingSession]),
    AuthModule,
    PlacesModule,
  ],
})
export class TrackingModule {}
