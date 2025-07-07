import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPlaceEntity } from '../entities/user-place.entity';
import { UserPlace } from '../models/user-place.model';

@Injectable()
export class UserPlaceService {
  constructor(
    @InjectRepository(UserPlaceEntity)
    private readonly userPlaceRepository: Repository<UserPlaceEntity>,
  ) {}

  async create(userId: string, placeId: string): Promise<UserPlace> {
    const userPlace = await this.userPlaceRepository.save({
      user: { id: userId },
      place: { id: placeId },
      lastUsedAt: new Date(),
    });

    return userPlace;
  }

  async findOrCreate(userId: string, placeId: string): Promise<UserPlace> {
    const userPlace = await this.userPlaceRepository.findOne({
      where: {
        user: { id: userId },
        place: { id: placeId },
      },
    });

    if (userPlace) {
      return userPlace;
    }

    return this.create(userId, placeId);
  }

  async delete(userId: string, placeId: string) {
    await this.userPlaceRepository.delete({
      user: { id: userId },
      place: { id: placeId },
    });

    return { message: 'Place deleted successfully' };
  }

  async updateLastUsedAt(
    userId: string,
    placeId: string,
    date: Date = new Date(),
  ): Promise<void> {
    await this.userPlaceRepository.update(
      {
        user: { id: userId },
        place: { id: placeId },
      },
      {
        lastUsedAt: date,
      },
    );
  }

  async registerUsage(
    userId: string,
    placeId: string,
    date: Date = new Date(),
  ) {
    this.findOrCreate(userId, placeId);
    await this.updateLastUsedAt(userId, placeId, date);
  }
}
