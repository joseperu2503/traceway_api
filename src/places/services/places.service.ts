import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlaceEntity } from '../entities/place.entity';
import { UserPlaceEntity } from '../entities/user-place.entity';
import { CreatePlaceParams } from '../models/create-place-params';
import { FindPlaceResult } from '../models/find-place-result';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(PlaceEntity)
    private readonly placeRepository: Repository<PlaceEntity>,
    @InjectRepository(UserPlaceEntity)
    private readonly userPlaceRepository: Repository<UserPlaceEntity>,
  ) {}

  async create(params: CreatePlaceParams) {
    //Buscar si ya existe, por coordenadas
    const placeExists = await this.placeRepository.findOne({
      where: { latitude: params.latitude, longitude: params.longitude },
    });

    if (placeExists) {
      return placeExists;
    }

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
