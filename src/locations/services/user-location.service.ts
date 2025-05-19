import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLocation } from '../entities/user-location.entity';
import { FindUserLocationResult } from '../interfaces/find-user-location-result.interface';

@Injectable()
export class UserLocationService {
  constructor(
    @InjectRepository(UserLocation)
    private readonly userLocationRepository: Repository<UserLocation>,
  ) {}

  async create(userId: string, locationId: string) {
    const userLocation = await this.userLocationRepository.save({
      user: { id: userId },
      location: { id: locationId },
    });

    return {
      id: userLocation.id,
      userId: userId,
      locationId: locationId,
    };
  }

  async findOne(
    userId: string,
    locationId: string,
  ): Promise<FindUserLocationResult | null> {
    const userLocation = await this.userLocationRepository.findOne({
      where: {
        user: { id: userId },
        location: { id: locationId },
      },
      relations: {
        location: true,
        user: true,
      },
    });

    if (!userLocation) return null;

    return {
      userId: userLocation.user.id,
      locationId: userLocation.location.id,
    };
  }

  async delete(userId: string, locationId: string): Promise<void> {
    await this.userLocationRepository.delete({
      user: { id: userId },
      location: { id: locationId },
    });
  }
}
