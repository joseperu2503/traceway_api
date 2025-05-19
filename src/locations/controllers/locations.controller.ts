import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
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

@Controller('locations')
export class LocationsController {
  constructor(
    private readonly locationsService: LocationsService,
    private readonly googleMapsService: GoogleMapsService,
  ) {}

  @Post()
  @JwtAuth()
  create(@GetUser() user: User, @Body() request: CreateLocationRequest) {
    return this.locationsService.create({
      ...request,
      userId: user.id,
    });
  }

  @Get()
  @JwtAuth()
  findAll(@GetUser() user: User) {
    return this.locationsService.findAll(user.id);
  }

  @Delete(':id')
  @JwtAuth()
  async delete(@GetUser() user: User, @Param('id') id: string) {
    const location = await this.locationsService.findOne(id);

    if (!location) {
      throw new NotFoundException('Location not found');
    }

    if (location.userId !== user.id) {
      throw new ForbiddenException(
        'You are not allowed to delete this location',
      );
    }

    await this.locationsService.delete(id);
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
