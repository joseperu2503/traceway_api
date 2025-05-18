import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsPositive, ValidateNested } from 'class-validator';
import { CreateToppingDishCartDto } from 'src/carts/dto/create-topping-dish-cart.dto';

class Topping extends OmitType(CreateToppingDishCartDto, [
  'dishCartId',
] as const) {}

export class CreateDishCartDto {
  @ApiProperty({
    description: 'The ID of the dish to be added to the cart.',
    example: 1,
  })
  @IsInt()
  @IsPositive()
  readonly dishId: number;

  @IsInt()
  @IsPositive()
  readonly cartId: number;

  @ApiProperty({
    description: 'The number of units of the dish to be added.',
    example: 2,
  })
  @IsInt()
  @IsPositive()
  readonly units: number;

  @ApiProperty({
    description: 'A list of toppings to be added to the dish.',
    isArray: true,
    type: CreateToppingDishCartDto,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Topping)
  toppings: Topping[];
}
