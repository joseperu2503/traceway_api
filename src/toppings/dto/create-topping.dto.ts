import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateToppingDto {
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsInt()
  @IsPositive()
  readonly maxLimit: number;

  @IsNumber()
  @IsPositive()
  readonly price: number;

  @IsInt()
  @IsPositive()
  readonly toppingCategoryId: number;
}
