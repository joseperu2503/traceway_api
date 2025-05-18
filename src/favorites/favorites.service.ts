import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { FavoriteDishDto } from './dto/favorite-dish.dto';
import { User } from 'src/auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteDish } from './entities/favorite-dish.entity';
import { Repository } from 'typeorm';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { Dish } from 'src/dishes/entities/dish.entity';
import { FavoriteRestaurantDto } from './dto/favorite-restaurant.dto';
import { FavoriteRestaurant } from './entities/favorite-restaurant.entity';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';
import { RestaurantsService } from 'src/restaurants/services/restaurants.service';
import { DishesService } from 'src/dishes/dishes.service';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoriteDish)
    private readonly favoriteDishRepository: Repository<FavoriteDish>,

    @InjectRepository(FavoriteRestaurant)
    private readonly favoriteRestaurantRepository: Repository<FavoriteRestaurant>,

    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,

    @InjectRepository(Dish)
    private readonly dishRepository: Repository<Dish>,

    private restaurantsService: RestaurantsService,

    private dishesService: DishesService,
  ) {}

  async favoriteDish(favoriteDishDto: FavoriteDishDto, user: User) {
    try {
      const favoriteDish = await this.favoriteDishRepository.findOne({
        where: {
          dish: {
            id: favoriteDishDto.dishId,
          },
          user: {
            id: user.id,
          },
        },
      });

      if (favoriteDish) {
        await this.favoriteDishRepository.remove(favoriteDish);
      } else {
        //**Buscar Dish */
        const dish = await this.dishRepository.findOne({
          where: { id: favoriteDishDto.dishId },
        });
        if (!dish) {
          throw new NotFoundException(
            `Dish ${favoriteDishDto.dishId} not found`,
          );
        }

        const newFavoriteDish: FavoriteDish =
          this.favoriteDishRepository.create();

        newFavoriteDish.user = user;
        newFavoriteDish.dish = dish;

        await this.favoriteDishRepository.save(newFavoriteDish);
      }

      return await this.dishesService.findOne(favoriteDishDto.dishId, user);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAllFavoriteDish(
    user: User,
    options: {
      page: number;
      limit: number;
    },
  ) {
    const favoriteDishes = await paginate<FavoriteDish>(
      this.favoriteDishRepository,
      options,
      {
        where: {
          user: {
            id: user.id,
          },
        },
        order: {
          id: 'DESC',
        },
        select: {
          id: true,
          dish: {
            id: true,
            name: true,
            image: true,
            price: true,
            description: true,
            stock: true,
          },
        },
        relations: {
          dish: true,
        },
      },
    );

    return new Pagination(
      favoriteDishes.items.map((favoriteDish) => ({
        ...favoriteDish.dish,
      })),
      favoriteDishes.meta,
      favoriteDishes.links,
    );
  }

  async favoriteRestaurant(
    favoriteRestaurantDto: FavoriteRestaurantDto,
    user: User,
  ) {
    try {
      const favoriteRestaurant =
        await this.favoriteRestaurantRepository.findOne({
          where: {
            restaurant: {
              id: favoriteRestaurantDto.restaurantId,
            },
            user: {
              id: user.id,
            },
          },
        });

      if (favoriteRestaurant) {
        await this.favoriteRestaurantRepository.remove(favoriteRestaurant);
      } else {
        //**Buscar Restaurant */
        const restaurant = await this.restaurantRepository.findOne({
          where: { id: favoriteRestaurantDto.restaurantId },
        });
        if (!restaurant) {
          throw new NotFoundException(
            `Restaurant ${favoriteRestaurantDto.restaurantId} not found`,
          );
        }

        const newFavoriteRestaurant: FavoriteRestaurant =
          this.favoriteRestaurantRepository.create();

        newFavoriteRestaurant.user = user;
        newFavoriteRestaurant.restaurant = restaurant;

        await this.favoriteRestaurantRepository.save(newFavoriteRestaurant);
      }

      return await this.restaurantsService.findOne(
        favoriteRestaurantDto.restaurantId,
        user,
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAllFavoriteRestaurant(
    user: User,
    options: {
      page: number;
      limit: number;
    },
  ) {
    const favoriteRestaurants = await paginate<FavoriteRestaurant>(
      this.favoriteRestaurantRepository,
      options,
      {
        where: {
          user: {
            id: user.id,
          },
        },
        order: {
          id: 'DESC',
        },
        select: {
          id: true,
          restaurant: {
            id: true,
            address: true,
            backdrop: true,
            closeTime: true,
            latitude: true,
            logo: true,
            longitude: true,
            name: true,
            openTime: true,
          },
        },
        relations: {
          restaurant: true,
        },
      },
    );

    return new Pagination(
      favoriteRestaurants.items.map((favoriteRestaurant) => ({
        ...favoriteRestaurant.restaurant,
        distance: 1500.5,
        time: 40.5,
        record: 4.6,
        recordPeople: 340,
        delivery: 4.2,
      })),
      favoriteRestaurants.meta,
      favoriteRestaurants.links,
    );
  }
}
