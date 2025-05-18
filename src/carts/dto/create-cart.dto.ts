import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsPositive, ValidateNested } from 'class-validator';
import { CreateDishCartDto } from 'src/carts/dto/create-dish-cart.dto';

class Dish extends OmitType(CreateDishCartDto, ['cartId'] as const) {}

export class CreateCartDto {
  @ApiProperty({
    description: 'The ID of the restaurant associated with the cart.',
    example: 1,
  })
  @IsInt()
  @IsPositive()
  readonly restaurantId: number;

  @ApiProperty({
    description: 'A list of dishes the user wants to add to the cart.',
    isArray: true,
    type: CreateDishCartDto,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Dish)
  readonly dishes: Dish[];

  @ApiProperty({
    description: 'The ID of the address associated with the cart.',
    example: 1,
  })
  @IsInt()
  @IsPositive()
  readonly addressId: number;
}
