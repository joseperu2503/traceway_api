import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({
    description: 'The locality or district where the address is located.',
    example: 'Puente Piedra',
  })
  @IsString()
  @IsNotEmpty()
  locality: string;

  @ApiProperty({
    description: 'The country where the address is located.',
    example: 'Peru',
  })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({
    description:
      'The main street, avenue, or specific location of the address.',
    example: 'Avenida Las Viñas',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description:
      'Additional details to describe the address, such as apartment number or floor.',
    example: 'Apartment 305, Building A',
    required: false,
  })
  @IsString()
  detail: string;

  @ApiProperty({
    description:
      'References to help locate the address, such as landmarks or nearby locations.',
    example: 'Near the supermarket',
    required: false,
  })
  @IsString()
  references: string;

  @ApiProperty({
    description:
      'The latitude of the address location, represented as a decimal number.',
    example: -11.850501612187411,
  })
  @IsNumber()
  latitude: number;

  @ApiProperty({
    description:
      'The longitude of the address location, represented as a decimal number.',
    example: -77.08191242069006,
  })
  @IsNumber()
  longitude: number;

  @ApiProperty({
    description: 'The tag associated with the address.',
    example: 1,
    required: false,
  })
  @IsInt()
  @IsPositive()
  @IsOptional()
  addressTagId: number;

  @ApiProperty({
    description: 'The delivery detail associated with the address.',
    example: 1,
    required: false,
  })
  @IsInt()
  @IsPositive()
  @IsOptional()
  addressDeliveryDetailId: number;
}
