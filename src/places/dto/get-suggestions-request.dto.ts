import { IsString } from 'class-validator';

export class GetSuggestionsRequest {
  @IsString()
  query: string;
}
