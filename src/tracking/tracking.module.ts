import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { LocationsModule } from 'src/locations/locations.module';
import { Location } from '../locations/entities/location.entity';
import { TrackingController } from './controllers/traking.controller';
import { TrackingSession } from './entities/tracking-session.entity';
import { TrackingService } from './services/traking.service';

@Module({
  controllers: [TrackingController],
  providers: [TrackingService],
  imports: [
    TypeOrmModule.forFeature([Location, TrackingSession]),
    AuthModule,
    LocationsModule,
  ],
})
export class TrackingModule {}
