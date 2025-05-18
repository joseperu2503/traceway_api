import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCardDto {
  @IsString()
  @IsNotEmpty()
  readonly token: string;
}
