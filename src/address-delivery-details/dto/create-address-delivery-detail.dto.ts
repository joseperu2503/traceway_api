import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAddressDeliveryDetailDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
