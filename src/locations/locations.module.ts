import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { LocationsController } from './controllers/locations.controller';
import { Location } from './entities/location.entity';
import { UserLocation } from './entities/user-location.entity';
import { GoogleMapsService } from './services/google-maps.service';
import { LocationsService } from './services/locations.service';
import { UserLocationService } from './services/user-location.service';

@Module({
  controllers: [LocationsController],
  providers: [LocationsService, GoogleMapsService, UserLocationService],
  imports: [
    TypeOrmModule.forFeature([Location, UserLocation]),
    AuthModule,
    HttpModule,
  ],
  exports: [LocationsService, UserLocationService],
})
export class LocationModule {}
