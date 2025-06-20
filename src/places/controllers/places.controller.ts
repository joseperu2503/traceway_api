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
import { CreatePlaceRequest } from '../dto/create-place-request.dto';
import { getSuggestionGeometryRequest } from '../dto/get-suggestion-geometry-request.dto';
import { GetSuggestionsRequest } from '../dto/get-suggestions-request.dto';
import { ReverseGeocodeRequest } from '../dto/reverse-geocode-request.dto';
import { PlaceModel } from '../models/place-model';
import { PlacesService } from '../services/places.service';
import { UserPlaceService } from '../services/user-place.service';

@Controller('places')
export class PlacesController {
  constructor(
    private readonly placesService: PlacesService,
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

  @Post('suggestions')
  async suggestions(@Body() request: GetSuggestionsRequest) {
    return this.placesService.suggestions(request.query);
  }

  @Post('reverse-geocode')
  async reverseGeocode(@Body() request: ReverseGeocodeRequest) {
    const { latitude, longitude } = request;
    return this.placesService.reverseGeocode(latitude, longitude);
  }

  @Post('suggestion-geometry')
  async getSuggestionGeometry(@Body() request: getSuggestionGeometryRequest) {
    return this.placesService.getSuggestionGeometry(request.suggestionId);
  }
}
