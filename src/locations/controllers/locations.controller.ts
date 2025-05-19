import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { JwtAuth } from 'src/auth/decorators/jwt-auth.decorator';
import { User } from 'src/auth/entities/user.entity';
import { AutocompleteRequest } from '../dto/autocomplete-request.dto';
import { CreateLocationRequest } from '../dto/create-location-request.dto';
import { GeocodeRequest } from '../dto/geocode-request.dto';
import { PlaceDetailsRequest } from '../dto/place-details-request.dto';
import { GoogleMapsService } from '../services/google-maps.service';
import { LocationsService } from '../services/locations.service';
import { UserLocationService } from '../services/user-location.service';

@Controller('locations')
export class LocationsController {
  constructor(
    private readonly locationsService: LocationsService,
    private readonly googleMapsService: GoogleMapsService,
    private readonly userLocationService: UserLocationService,
  ) {}

  @Post()
  @JwtAuth()
  async create(@GetUser() user: User, @Body() request: CreateLocationRequest) {
    let location = await this.locationsService.findByCordinates(
      request.latitude,
      request.longitude,
    );

    if (!location) {
      location = await this.locationsService.create({ ...request });
    }

    await this.userLocationService.create(user.id, location.id);
    return location;
  }

  @Get()
  @JwtAuth()
  findAll(@GetUser() user: User) {
    return this.locationsService.findAllByUser(user.id);
  }

  @Delete(':locationId')
  @JwtAuth()
  async delete(@GetUser() user: User, @Param('locationId') locationId: string) {
    const userLocation = await this.userLocationService.findOne(
      user.id,
      locationId,
    );

    if (!userLocation) {
      throw new NotFoundException('Location not found');
    }

    await this.userLocationService.delete(user.id, locationId);

    return { message: 'Location deleted successfully' };
  }

  @Post('autocomplete')
  async autocomplete(@Body() request: AutocompleteRequest) {
    return this.googleMapsService.autocomplete(request.input);
  }

  @Post('geocode')
  async geocode(@Body() request: GeocodeRequest) {
    const { latitude, longitude } = request;
    return this.googleMapsService.geocode(latitude, longitude);
  }

  @Post('place-details')
  async placeDetails(@Body() request: PlaceDetailsRequest) {
    return this.googleMapsService.placeDetails(request.placeId);
  }
}
