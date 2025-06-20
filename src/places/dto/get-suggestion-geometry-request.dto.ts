import { IsString } from 'class-validator';

export class getSuggestionGeometryRequest {
  @IsString()
  suggestionId: string;
}
