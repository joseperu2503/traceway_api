import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateRestaurantCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsUrl()
  image: string;
}
