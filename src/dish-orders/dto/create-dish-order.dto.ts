import { OmitType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsPositive, ValidateNested } from 'class-validator';
import { CreateToppingDishOrderDto } from 'src/topping-dish-orders/dto/create-topping-dish-order.dto';

export class CreateDishOrderDto {
  @IsInt()
  @IsPositive()
  readonly dishId: number;

  @IsInt()
  @IsPositive()
  readonly orderId: number;

  @IsInt()
  @IsPositive()
  readonly units: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Topping)
  toppings: Topping[];
}

class Topping extends OmitType(CreateToppingDishOrderDto, [
  'dishOrderId',
] as const) {}
