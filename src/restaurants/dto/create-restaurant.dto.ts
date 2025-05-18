import {
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  @MinLength(1)
  readonly name: string;

  @IsString()
  @MinLength(1)
  readonly address: string;

  @IsString()
  @IsUrl()
  readonly logo: string;

  @IsString()
  @IsUrl()
  readonly backdrop: string;

  @IsInt()
  @IsPositive()
  readonly restaurantCategoryId: number;

  @IsNumber()
  readonly latitude: number;

  @IsNumber()
  readonly longitude: number;

  @Matches(/^([01]\d|2[0-3]):?([0-5]\d)$/, {
    message: (validationArguments) =>
      `${validationArguments.property} must be a valid time in HH:mm format`,
  })
  readonly openTime: string;

  @Matches(/^([01]\d|2[0-3]):?([0-5]\d)$/, {
    message: (validationArguments) =>
      `${validationArguments.property} must be a valid time in HH:mm format`,
  })
  readonly closeTime: string;
}
