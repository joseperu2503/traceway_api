import { AddressType, PlaceType2 } from '@googlemaps/google-maps-services-js';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { PlaceEntity } from '../entities/place.entity';
import { UserPlaceEntity } from '../entities/user-place.entity';
import { FindOrCreatePlaceParams } from '../interfaces/find-or-create-place-params';
import { Place } from '../models/place.model';
import { GoogleMapsSdkService } from './google-maps.service';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(PlaceEntity)
    private readonly placeRepository: Repository<PlaceEntity>,
    @InjectRepository(UserPlaceEntity)
    private readonly userPlaceRepository: Repository<UserPlaceEntity>,

    private readonly googleMapsService: GoogleMapsSdkService,
  ) {}

  async findAllByUser(userId: string) {
    const userPlaces = await this.userPlaceRepository.find({
      where: { user: { id: userId } },
      relations: {
        place: true,
      },
      order: {
        lastUsedAt: 'DESC',
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

  async findOne(id: string): Promise<Place | null> {
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

  async findOrCreate(params: FindOrCreatePlaceParams): Promise<Place> {
    let place = await this.placeRepository.findOne({
      where: {
        latitude: params.latitude,
        longitude: params.longitude,
      },
    });

    if (!place) {
      place = await this.placeRepository.save(params);
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

  async suggestions(input: string) {
    const sessiontoken = uuidv4();
    const center = { lat: -11.851897, lng: -77.082528 };
    const country = 'pe';

    // 1) Recoge ambas llamadas (10 km y 20 km)
    const [r1, r2] = await Promise.all([
      this.googleMapsService.autocomplete(
        input,
        country,
        center,
        10000,
        true,
        sessiontoken,
      ),
      this.googleMapsService.autocomplete(
        input,
        country,
        center,
        undefined,
        false,
        sessiontoken,
      ),
    ]);

    // 2) Fusiona y deduplica
    const all = [...r1.data.predictions, ...r2.data.predictions];
    const unique = Array.from(
      new Map(all.map((p) => [p.place_id, p])).values(),
    );

    // 3) Define tu mapa de prioridad
    const typePriority: Partial<Record<AddressType, number>> = {
      country: 0,
      administrative_area_level_1: 1,
      administrative_area_level_2: 1,
      locality: 2,
      sublocality: 2,
      route: 3,
      street_address: 3,
      establishment: 4,
      point_of_interest: 5,
    };

    const getTypeScore = (p: (typeof unique)[0]) =>
      p.types
        .map((t) => typePriority[t] ?? 100)
        .reduce((min, cur) => Math.min(min, cur), Infinity);

    // 4) Ordena por tipo → distancia
    const sorted = unique.sort((a, b) => {
      const ta = getTypeScore(a),
        tb = getTypeScore(b);
      if (ta !== tb) return ta - tb;
      return (a.distance_meters ?? Infinity) - (b.distance_meters ?? Infinity);
    });

    // 5) Devuelve al formato de tu UI
    return sorted.map((p) => ({
      resultId: p.place_id,
      mainText: p.structured_formatting.main_text ?? '',
      secondaryText: p.structured_formatting.secondary_text ?? '',
      distance: p.distance_meters,
    }));
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

      const route = components.find((c) => c.types.includes(PlaceType2.route));

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
