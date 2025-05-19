import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { LocationsController } from './controllers/locations.controller';
import { Location } from './entities/location.entity';
import { GoogleMapsService } from './services/google-maps.service';
import { LocationsService } from './services/locations.service';

@Module({
  controllers: [LocationsController],
  providers: [LocationsService, GoogleMapsService],
  imports: [TypeOrmModule.forFeature([Location]), AuthModule, HttpModule],
})
export class LocationModule {}
