import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteDish } from './entities/favorite-dish.entity';
import { FavoriteRestaurant } from './entities/favorite-restaurant.entity';
import { Dish } from 'src/dishes/entities/dish.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { AuthModule } from 'src/auth/auth.module';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';
import { DishesModule } from 'src/dishes/dishes.module';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [
    TypeOrmModule.forFeature([
      FavoriteDish,
      FavoriteRestaurant,
      Dish,
      Restaurant,
    ]),
    AuthModule,
    RestaurantsModule,
    DishesModule,
  ],
  exports: [FavoritesService],
})
export class FavoritesModule {}
