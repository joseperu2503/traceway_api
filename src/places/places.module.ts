import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { PlacesController } from './controllers/places.controller';
import { PlaceEntity } from './entities/place.entity';
import { UserPlaceEntity } from './entities/user-place.entity';
import {
  GoogleMapsHttpService,
  GoogleMapsSdkService,
} from './services/google-maps.service';
import { PlacesService } from './services/places.service';
import { UserPlaceService } from './services/user-place.service';

@Module({
  controllers: [PlacesController],
  providers: [
    PlacesService,
    GoogleMapsHttpService,
    UserPlaceService,
    GoogleMapsSdkService,
  ],
  imports: [
    TypeOrmModule.forFeature([PlaceEntity, UserPlaceEntity]),
    AuthModule,
    HttpModule,
  ],
  exports: [PlacesService, UserPlaceService, TypeOrmModule],
})
export class PlacesModule {}
