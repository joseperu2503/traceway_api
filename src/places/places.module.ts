import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { PlacesController } from './controllers/places.controller';
import { Place } from './entities/place.entity';
import { UserPlace } from './entities/user-place.entity';
import { GoogleMapsService } from './services/google-maps.service';
import { PlacesService } from './services/places.service';
import { UserPlaceService } from './services/user-place.service';

@Module({
  controllers: [PlacesController],
  providers: [PlacesService, GoogleMapsService, UserPlaceService],
  imports: [
    TypeOrmModule.forFeature([Place, UserPlace]),
    AuthModule,
    HttpModule,
  ],
  exports: [PlacesService, UserPlaceService, TypeOrmModule],
})
export class PlacesModule {}
