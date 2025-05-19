import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GoogleMapsService {
  private readonly googleMapsApiKey: string;

  constructor(private readonly httpService: HttpService) {
    this.googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY ?? '';
  }

  async autocomplete(input: string) {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
      input,
    )}&key=${this.googleMapsApiKey}`;

    const response = await firstValueFrom(this.httpService.get(url));

    const predictions = response.data.predictions.map((prediction) => ({
      placeId: prediction.place_id,
      structuredFormatting: {
        mainText: prediction.structured_formatting.main_text ?? '',
        secondaryText: prediction.structured_formatting.secondary_text ?? '',
      },
    }));

    return predictions;
  }

  async placeDetails(placeId: string) {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&fields=geometry&key=${this.googleMapsApiKey}`;

    const response = await firstValueFrom(this.httpService.get(url));
    const geometry = response.data.result.geometry;

    return geometry;
  }

  async geocode(latitude: number, longitude: number) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${this.googleMapsApiKey}`;

    const response = await firstValueFrom(this.httpService.get(url));

    const results = response.data.results;

    // Buscar el primer resultado con un componente de tipo 'route'
    for (const result of results) {
      const routeComponent = result.address_components.find((component) =>
        component.types.includes('route'),
      );

      if (routeComponent) {
        // Encontrar country y locality
        const countryComponent = result.address_components.find((component) =>
          component.types.includes('country'),
        );
        const localityComponent = result.address_components.find((component) =>
          component.types.includes('locality'),
        );

        return {
          address: routeComponent.long_name,
          country: countryComponent ? countryComponent.long_name : null,
          locality: localityComponent ? localityComponent.long_name : null,
        };
      }
    }
  }
}
