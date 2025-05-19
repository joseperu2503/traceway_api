import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { JwtAuth } from 'src/auth/decorators/jwt-auth.decorator';
import { User } from 'src/auth/entities/user.entity';
import { CreateLocationRequest } from '../dto/create-location-request.dto';
import { LocationsService } from '../services/locations.service';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

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
  delete(@GetUser() user: User, @Param('id') id: string) {
    return this.locationsService.delete(id, user.id);
  }
}
