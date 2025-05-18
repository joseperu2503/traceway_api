import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAddressTagDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
