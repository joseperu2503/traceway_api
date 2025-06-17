import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Place } from '../entities/place.entity';
import { UserPlace } from '../entities/user-place.entity';
import { CreatePlaceParams } from '../models/create-place-params';
import { FindPlaceResult } from '../models/find-place-result';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,
    @InjectRepository(UserPlace)
    private readonly userPlaceRepository: Repository<UserPlace>,
  ) {}

  async create(params: CreatePlaceParams) {
    const place = await this.placeRepository.save(params);
    return place;
  }

  async findAllByUser(userId: string) {
    const userPlaces = await this.userPlaceRepository.find({
      where: { user: { id: userId } },
      relations: {
        place: true,
      },
    });

    return userPlaces.map((userPlace) => ({
      id: userPlace.place.id,
      mainText: userPlace.place.mainText,
      secondaryText: userPlace.place.secondaryText,
      latitude: userPlace.place.latitude,
      longitude: userPlace.place.longitude,
    }));
  }

  async findOne(id: string): Promise<FindPlaceResult | null> {
    const place = await this.placeRepository.findOne({
      where: { id },
    });

    if (!place) {
      return null;
    }

    return {
      id: place.id,
      mainText: place.mainText,
      secondaryText: place.secondaryText,
      latitude: place.latitude,
      longitude: place.longitude,
    };
  }

  async findByCordinates(latitude: number, longitude: number) {
    const place = await this.placeRepository.findOne({
      where: {
        latitude,
        longitude,
      },
      relations: {
        userPlaces: true,
      },
    });

    if (!place) {
      return null;
    }

    return {
      id: place.id,
      mainText: place.mainText,
      secondaryText: place.secondaryText,
      latitude: place.latitude,
      longitude: place.longitude,
    };
  }

  async delete(id: string) {
    return this.placeRepository.delete(id);
  }
}
