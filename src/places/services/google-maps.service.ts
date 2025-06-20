import {
  Client,
  PlaceAutocompleteResponse,
  PlaceDetailsResponse,
  ReverseGeocodeResponse,
} from '@googlemaps/google-maps-services-js';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GoogleMapsSdkService implements GoogleMapsService {
  private readonly googleMapsApiKey: string =
    process.env.GOOGLE_MAPS_API_KEY ?? '';

  private readonly client = new Client({});

  async autocomplete(input: string): Promise<PlaceAutocompleteResponse> {
    const response = await this.client.placeAutocomplete({
      params: {
        input,
        key: this.googleMapsApiKey,
      },
    });

    return response;
  }

  async placeDetails(placeId: string) {
    const response = await this.client.placeDetails({
      params: {
        place_id: placeId,
        key: this.googleMapsApiKey,
        fields: ['geometry'],
      },
    });
    return response;
  }

  async reverseGeocode(latitude: number, longitude: number) {
    const response = await this.client.reverseGeocode({
      params: {
        latlng: `${latitude},${longitude}`,
        key: this.googleMapsApiKey,
      },
    });

    return response;
  }
}

@Injectable()
export class GoogleMapsHttpService implements GoogleMapsService {
  private readonly googleMapsApiKey: string =
    process.env.GOOGLE_MAPS_API_KEY ?? '';

  constructor(private readonly httpService: HttpService) {}

  async autocomplete(input: string): Promise<PlaceAutocompleteResponse> {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
      input,
    )}&key=${this.googleMapsApiKey}`;

    const response = await firstValueFrom(this.httpService.get(url));

    return response;
  }

  async placeDetails(resultId: string) {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${resultId}&fields=geometry&key=${this.googleMapsApiKey}`;

    const response = await firstValueFrom(this.httpService.get(url));
    return response;
  }

  async reverseGeocode(latitude: number, longitude: number) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${this.googleMapsApiKey}`;

    const response = await firstValueFrom(this.httpService.get(url));

    return response;
  }
}

export interface GoogleMapsService {
  autocomplete(input: string): Promise<PlaceAutocompleteResponse>;
  placeDetails(placeId: string): Promise<PlaceDetailsResponse>;
  reverseGeocode(lat: number, lng: number): Promise<ReverseGeocodeResponse>;
}
