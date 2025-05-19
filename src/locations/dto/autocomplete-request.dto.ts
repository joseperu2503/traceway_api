import { IsString } from 'class-validator';

export class AutocompleteRequest {
  @IsString()
  input: string;
}
