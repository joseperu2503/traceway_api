import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDishDto } from './dto/create-dish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Dish } from './entities/dish.entity';
import { In, Repository } from 'typeorm';
import { Topping } from 'src/toppings/entities/topping.entity';
import { User } from 'src/auth/entities/user.entity';
import { FavoriteDish } from 'src/favorites/entities/favorite-dish.entity';
import { DishCategory } from 'src/dish-categories/entities/dish-category.entity';
import { ToppingCategory } from 'src/topping-categories/entities/topping-category.entity';

@Injectable()
export class DishesService {
  constructor(
    @InjectRepository(Dish)
    private readonly dishRepository: Repository<Dish>,

    @InjectRepository(DishCategory)
    private readonly dishCategoryRepository: Repository<DishCategory>,

    @InjectRepository(Topping)
    private readonly toppingRepository: Repository<Topping>,

    @InjectRepository(ToppingCategory)
    private readonly toppingCategoryRepository: Repository<ToppingCategory>,

    @InjectRepository(FavoriteDish)
    private readonly favoriteDishRepository: Repository<FavoriteDish>,
  ) {}

  async create(createDishDto: CreateDishDto) {
    const dish: Dish = this.dishRepository.create(createDishDto);

    const dishCategory = await this.dishCategoryRepository.findOneBy({
      id: createDishDto.dishCategoryId,
    });

    if (!dishCategory) {
      return;
    }

    dish.dishCategory = dishCategory;

    const toppings = await this.toppingRepository.findBy({
      id: In(createDishDto.toppingsIds),
    });

    dish.toppings = toppings;

    await this.dishRepository.save(dish);
  }

  async findOne(dishId: number, user?: User) {
    const dish = await this.dishRepository.findOne({
      where: { id: dishId },
      select: {
        id: true,
        image: true,
        description: true,
        name: true,
        stock: true,
        price: true,
        dishCategory: {
          id: true,
          name: true,
          restaurant: {
            id: true,
            name: true,
          },
        },
      },
      relations: {
        dishCategory: {
          restaurant: true,
        },
      },
    });

    if (!dish) {
      throw new NotFoundException(`Dish ${dishId} not found`);
    }

    let isFavorite = false;

    if (user) {
      const favoriteRestaurant = await this.favoriteDishRepository.findOne({
        where: {
          dish: {
            id: dish.id,
          },
          user: {
            id: user.id,
          },
        },
      });

      isFavorite = !!favoriteRestaurant;
    }

    return {
      ...dish,
      isFavorite: isFavorite,
    };
  }

  async toppings(dishId: number) {
    const dish = await this.dishRepository.findOne({
      where: { id: dishId },
      relations: {
        toppings: {
          toppingCategory: true,
        },
      }, // Incluimos la relación con los toppings
    });

    if (!dish) {
      throw new NotFoundException(`Dish ${dishId} not found`);
    }

    // Obtenemos los IDs de las categorías de toppings de los toppings relacionados con el plato
    const toppingCategoryIds = dish.toppings.map(
      (topping) => topping.toppingCategory.id,
    );

    // Eliminamos duplicados
    const uniqueToppingCategoryIds = [...new Set(toppingCategoryIds)];

    // Obtenemos las categorías de toppings usando los IDs únicos
    const toppingCategories = await this.toppingCategoryRepository.find({
      where: {
        id: In(uniqueToppingCategoryIds),
      },
      select: {
        id: true,
        description: true,
        isActive: true,
        maxToppings: true,
        minToppings: true,
        toppings: {
          id: true,
          description: true,
          isActive: true,
          maxLimit: true,
          price: true,
        },
      },
      relations: {
        toppings: true,
      },
    });

    return toppingCategories.map((toppingCategory) => {
      return {
        ...toppingCategory,
        subtitle:
          toppingCategory.maxToppings > 1
            ? `Select maximun ${toppingCategory.maxToppings} options`
            : '',
      };
    });
  }
}
