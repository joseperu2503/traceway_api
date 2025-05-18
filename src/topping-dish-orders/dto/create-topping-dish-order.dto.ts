import { IsInt, IsPositive } from 'class-validator';

export class CreateToppingDishOrderDto {
  @IsInt()
  @IsPositive()
  readonly dishOrderId: number;

  @IsInt()
  @IsPositive()
  readonly toppingId: number;

  @IsInt()
  @IsPositive()
  readonly units: number;
}
