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
      resultId: prediction.place_id,
      mainText: prediction.structured_formatting.main_text ?? '',
      secondaryText: prediction.structured_formatting.secondary_text ?? '',
    }));

    return predictions;
  }

  async resultCoordinates(resultId: string) {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${resultId}&fields=geometry&key=${this.googleMapsApiKey}`;

    const response = await firstValueFrom(this.httpService.get(url));
    const geometry = response.data.result.geometry;

    return geometry;
  }

  async geocode(latitude: number, longitude: number) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${this.googleMapsApiKey}`;

    const response = await firstValueFrom(this.httpService.get(url));

    const results = response.data.results;

    for (const result of results) {
      const components = result.address_components;

      const streetNumber = components.find((c) =>
        c.types.includes('street_number'),
      );
      const route = components.find((c) => c.types.includes('route'));

      // Si no hay ni calle ni número, pasa al siguiente resultado
      if (!route && !streetNumber) continue;

      const district = components.find(
        (c) =>
          c.types.includes('sublocality') ||
          c.types.includes('sublocality_level_1') ||
          c.types.includes('administrative_area_level_2'),
      );

      const city = components.find(
        (c) =>
          c.types.includes('locality') ||
          c.types.includes('administrative_area_level_1'),
      );

      const country = components.find((c) => c.types.includes('country'));

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
