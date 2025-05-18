import { Module } from '@nestjs/common';
import { RestaurantsService } from './services/restaurants.service';
import { RestaurantsController } from './controllers/restaurants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { AuthModule } from 'src/auth/auth.module';
import { FavoriteRestaurant } from 'src/favorites/entities/favorite-restaurant.entity';
import { DishCategory } from 'src/dish-categories/entities/dish-category.entity';
import { RestaurantCategory } from './entities/restaurant-category.entity';
import { RestaurantCategoriesService } from './services/restaurant-categories.service';

@Module({
  controllers: [RestaurantsController],
  providers: [RestaurantsService, RestaurantCategoriesService],
  imports: [
    TypeOrmModule.forFeature([
      Restaurant,
      FavoriteRestaurant,
      DishCategory,
      RestaurantCategory,
    ]),
    AuthModule,
  ],
  exports: [RestaurantsService, RestaurantCategoriesService],
})
export class RestaurantsModule {}
