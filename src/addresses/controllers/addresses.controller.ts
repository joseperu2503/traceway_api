import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AddressesService } from '../services/addresses.service';
import { CreateAddressDto } from '../dto/create-address.dto';
import { JwtAuth } from 'src/auth/decorators/jwt-auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { GoogleMapsService } from '../services/google-maps.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@JwtAuth()
@Controller('addresses')
@ApiTags('Addresses')
export class AddressesController {
  constructor(
    private readonly addressesService: AddressesService,
    private readonly googleMapsService: GoogleMapsService,
  ) {}

  @Get()
  @ApiOperation({
    summary: "Retrieve the authenticated user's addresses",
  })
  @ApiResponse({
    status: 200,
    description:
      'Successfully retrieved the list of addresses for the authenticated user.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  async addresses(@GetUser() user: User) {
    return this.addressesService.addresses(user);
  }

  @Post()
  @ApiOperation({
    summary: 'Add a new address for the authenticated user.',
  })
  @ApiBody({
    type: CreateAddressDto,
  })
  @ApiResponse({
    status: 201,
    description:
      "Successful operation. The new address has been added to the user's list.",
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  async create(
    @Body() createAddressDto: CreateAddressDto,
    @GetUser() user: User,
  ) {
    return this.addressesService.create(createAddressDto, user);
  }

  @Get('autocomplete')
  @ApiOperation({
    summary:
      'Retrieve address suggestions based on input using Google Maps Autocomplete.',
  })
  @ApiResponse({
    status: 200,
    description:
      'Successfully retrieved address suggestions based on the input.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  async autocomplete(@Query('input') input: string) {
    return this.googleMapsService.autocomplete(input);
  }

  @Get('place-details')
  @ApiOperation({
    summary:
      'Retrieve detailed information about a place using its placeId from Google Maps.',
  })
  @ApiResponse({
    status: 200,
    description:
      'Successfully retrieved place details using the provided placeId.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  async placeDetails(@Query('placeId') placeId: string) {
    return this.googleMapsService.placeDetails(placeId);
  }

  @Get('geocode')
  @ApiOperation({
    summary:
      'Retrieve address information based on geographic coordinates (latitude and longitude) from Google Maps.',
  })
  @ApiResponse({
    status: 200,
    description:
      'Successfully retrieved the address for the provided geographic coordinates.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  async geocode(@Query('lat') lat: string, @Query('lng') lng: string) {
    return this.googleMapsService.geocode(lat, lng);
  }
}
