import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateDishCategoryDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsInt()
  @IsPositive()
  readonly restaurantId: number;
}
