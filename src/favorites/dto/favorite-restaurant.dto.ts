import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class FavoriteRestaurantDto {
  @ApiProperty({
    description: 'The restaurant ID',
    example: 1,
    minimum: 0,
  })
  @IsInt()
  @IsPositive()
  readonly restaurantId: number;
}
