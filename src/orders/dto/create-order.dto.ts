import { OmitType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateDishOrderDto } from 'src/dish-orders/dto/create-dish-order.dto';

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Dish)
  readonly dishes: Dish[];

  @IsInt()
  @IsPositive()
  readonly restaurantId: number;

  @IsInt()
  @IsPositive()
  readonly addressId: number;

  @IsString()
  @IsNotEmpty()
  readonly paymentMethodId: string;
}

class Dish extends OmitType(CreateDishOrderDto, ['orderId'] as const) {}
