import { ApiProperty } from '@nestjs/swagger';
import { IPaginationMetaSwagger } from 'src/common/pagination-with-swagger';
import { Restaurant } from '../entities/restaurant.entity';

export class RestaurantResponse extends Restaurant {
  @ApiProperty({
    description: 'Distance to the restaurant in meters',
  })
  distance: number;

  @ApiProperty({
    description: 'Estimated delivery time in minutes',
  })
  time: number;

  @ApiProperty({ description: 'Restaurant rating' })
  record: number;

  @ApiProperty({
    description: 'Number of people who rated the restaurant',
    minimum: 0,
    maximum: 5,
  })
  recordPeople: number;

  @ApiProperty({ description: 'Delivery price' })
  delivery: number;

  @ApiProperty({
    description:
      'Indicates whether the restaurant is marked as favorite by the user',
    example: true,
  })
  isFavorite: boolean;
}

export class FindAllRestaurantsResponse {
  @ApiProperty({
    description: 'List of restaurants returned in the pagination',
    type: () => RestaurantResponse,
    isArray: true,
  })
  readonly items: RestaurantResponse[];

  @ApiProperty({
    description: 'Meta information related to the pagination',
    type: () => IPaginationMetaSwagger,
  })
  readonly meta: IPaginationMetaSwagger;
}
