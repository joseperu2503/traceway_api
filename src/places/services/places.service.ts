import { PlaceType2 } from '@googlemaps/google-maps-services-js';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlaceEntity } from '../entities/place.entity';
import { UserPlaceEntity } from '../entities/user-place.entity';
import { FindOrCreatePlaceParams } from '../models/find-or-create-place-params';
import { PlaceModel } from '../models/place-model';
import { GoogleMapsHttpService } from './google-maps.service';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(PlaceEntity)
    private readonly placeRepository: Repository<PlaceEntity>,
    @InjectRepository(UserPlaceEntity)
    private readonly userPlaceRepository: Repository<UserPlaceEntity>,

    private readonly googleMapsService: GoogleMapsHttpService,
  ) {}

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

  async findOne(id: string): Promise<PlaceModel | null> {
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

  async findOrCreate(params: FindOrCreatePlaceParams): Promise<PlaceModel> {
    const place = await this.placeRepository.findOne({
      where: {
        latitude: params.latitude,
        longitude: params.longitude,
      },
    });

    if (place) {
      return place;
    }

    return this.placeRepository.save(params);
  }

  async delete(id: string) {
    return this.placeRepository.delete(id);
  }

  async suggestions(input: string) {
    const res = await this.googleMapsService.autocomplete(input);

    const predictions = res.data.predictions.map((prediction) => ({
      resultId: prediction.place_id,
      mainText: prediction.structured_formatting.main_text ?? '',
      secondaryText: prediction.structured_formatting.secondary_text ?? '',
    }));

    return predictions;
  }

  async getSuggestionGeometry(suggestionId: string) {
    const response = await this.googleMapsService.placeDetails(suggestionId);

    const geometry = response.data.result.geometry;

    return geometry;
  }

  async reverseGeocode(latitude: number, longitude: number) {
    const response = await this.googleMapsService.reverseGeocode(
      latitude,
      longitude,
    );

    const results = response.data.results;

    for (const result of results) {
      const components = result.address_components;

      const streetNumber = components.find((c) =>
        c.types.includes(PlaceType2.street_number),
      );

      const route = components.find((c) =>
        c.types.includes(PlaceType2.street_number),
      );

      // Si no hay ni calle ni número, pasa al siguiente resultado
      if (!route && !streetNumber) continue;

      const district = components.find(
        (c) =>
          c.types.includes(PlaceType2.sublocality) ||
          c.types.includes(PlaceType2.sublocality_level_1) ||
          c.types.includes(PlaceType2.administrative_area_level_2),
      );

      const city = components.find(
        (c) =>
          c.types.includes(PlaceType2.locality) ||
          c.types.includes(PlaceType2.administrative_area_level_2),
      );

      const country = components.find((c) =>
        c.types.includes(PlaceType2.country),
      );

      // Componer mainText y secondaryText
      const mainText = [route?.long_name, streetNumber?.long_name]
        .filter(Boolean)
        .join(' '); // Ej: "Avenida Arequipa 155"

      const secondaryText = [
        district?.long_name,
        city?.long_name,
        country?.long_name,
      ]
        .filter(Boolean)
        .join(', '); // Ej: "Miraflores, Lima, Perú"

      return {
        mainText,
        secondaryText,
      };
    }
  }
}
