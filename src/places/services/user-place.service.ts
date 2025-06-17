import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPlace } from '../entities/user-place.entity';
import { FindUserPlaceResult } from '../models/find-user-place-result';
import { UpdateUserPlaceParams } from '../models/update-user-place-params';

@Injectable()
export class UserPlaceService {
  constructor(
    @InjectRepository(UserPlace)
    private readonly userPlaceRepository: Repository<UserPlace>,
  ) {}

  async create(userId: string, placeId: string) {
    const userPlace = await this.userPlaceRepository.save({
      user: { id: userId },
      place: { id: placeId },
    });

    return {
      id: userPlace.id,
      userId: userId,
      placeId: placeId,
    };
  }

  async findOne(
    userId: string,
    placeId: string,
  ): Promise<FindUserPlaceResult | null> {
    const userPlace = await this.userPlaceRepository.findOne({
      where: {
        user: { id: userId },
        place: { id: placeId },
      },
      relations: {
        place: true,
        user: true,
      },
    });

    if (!userPlace) return null;

    return {
      userId: userPlace.user.id,
      placeId: userPlace.place.id,
    };
  }

  async delete(userId: string, placeId: string): Promise<void> {
    await this.userPlaceRepository.delete({
      user: { id: userId },
      place: { id: placeId },
    });
  }

  async update(userId: string, placeId: string, params: UpdateUserPlaceParams) {
    await this.userPlaceRepository.update(
      {
        user: { id: userId },
        place: { id: placeId },
      },
      {
        lastUsedAt: params.lastUsedAt,
      },
    );
  }
}
