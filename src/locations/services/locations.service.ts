import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from '../entities/location.entity';
import { UserLocation } from '../entities/user-location.entity';
import { CreateLocationParams } from '../interfaces/create-location-params.interface';
import { FindLocationResult } from '../interfaces/find-location-result.interface';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(UserLocation)
    private readonly userLocationRepository: Repository<UserLocation>,
  ) {}

  async create(params: CreateLocationParams) {
    const location = await this.locationRepository.save(params);
    return location;
  }

  async findAllByUser(userId: string) {
    const userLocations = await this.userLocationRepository.find({
      where: { user: { id: userId } },
      relations: {
        location: true,
      },
    });

    return userLocations.map((userLocation) => ({
      id: userLocation.location.id,
      mainText: userLocation.location.mainText,
      secondaryText: userLocation.location.secondaryText,
      latitude: userLocation.location.latitude,
      longitude: userLocation.location.longitude,
    }));
  }

  async findOne(id: string): Promise<FindLocationResult | null> {
    const location = await this.locationRepository.findOne({
      where: { id },
    });

    if (!location) {
      return null;
    }

    return {
      id: location.id,
      mainText: location.mainText,
      secondaryText: location.secondaryText,
      latitude: location.latitude,
      longitude: location.longitude,
    };
  }

  async findByCordinates(latitude: number, longitude: number) {
    const location = await this.locationRepository.findOne({
      where: {
        latitude,
        longitude,
      },
      relations: {
        userLocations: true,
      },
    });

    if (!location) {
      return null;
    }

    return {
      id: location.id,
      mainText: location.mainText,
      secondaryText: location.secondaryText,
      latitude: location.latitude,
      longitude: location.longitude,
    };
  }

  async delete(id: string) {
    return this.locationRepository.delete(id);
  }
}
