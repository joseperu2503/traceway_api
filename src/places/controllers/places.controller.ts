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
import { CreatePlaceRequest } from '../dto/create-place-request.dto';
import { GeocodeRequest } from '../dto/geocode-request.dto';
import { PlaceDetailsRequest } from '../dto/place-details-request.dto';
import { PlaceModel } from '../models/place-model';
import { GoogleMapsService } from '../services/google-maps.service';
import { PlacesService } from '../services/places.service';
import { UserPlaceService } from '../services/user-place.service';

@Controller('places')
export class PlacesController {
  constructor(
    private readonly placesService: PlacesService,
    private readonly googleMapsService: GoogleMapsService,
    private readonly userPlaceService: UserPlaceService,
  ) {}

  @Post()
  @JwtAuth()
  async create(
    @GetUser() user: User,
    @Body() request: CreatePlaceRequest,
  ): Promise<PlaceModel> {
    let place = await this.placesService.findByCordinates(
      request.latitude,
      request.longitude,
    );

    if (!place) {
      place = await this.placesService.create({
        latitude: request.latitude,
        longitude: request.longitude,
        mainText: request.mainText,
        secondaryText: request.secondaryText,
      });
    }

    await this.userPlaceService.create(user.id, place.id);
    return place;
  }

  @Get()
  @JwtAuth()
  findAll(@GetUser() user: User) {
    return this.placesService.findAllByUser(user.id);
  }

  @Delete(':placeId')
  @JwtAuth()
  async delete(@GetUser() user: User, @Param('placeId') placeId: string) {
    const userPlace = await this.userPlaceService.findOne(user.id, placeId);

    if (!userPlace) {
      throw new NotFoundException('Place not found');
    }

    await this.userPlaceService.delete(user.id, placeId);

    return { message: 'Place deleted successfully' };
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
    return this.googleMapsService.resultCoordinates(request.resultId);
  }
}
