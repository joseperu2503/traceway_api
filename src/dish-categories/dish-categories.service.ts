import { Injectable } from '@nestjs/common';
import { CreateDishCategoryDto } from './dto/create-dish-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DishCategory } from './entities/dish-category.entity';
import { Repository } from 'typeorm';
import { RestaurantsService } from 'src/restaurants/services/restaurants.service';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';

@Injectable()
export class DishCategoriesService {
  constructor(
    @InjectRepository(DishCategory)
    private readonly dishCategoryRepository: Repository<DishCategory>,
    private restaurantsService: RestaurantsService,
  ) {}

  async create(createDishCategoryDto: CreateDishCategoryDto) {
    const dishCategory: DishCategory = this.dishCategoryRepository.create(
      createDishCategoryDto,
    );

    const restaurant: Restaurant = await this.restaurantsService.findOne(
      createDishCategoryDto.restaurantId,
    );

    dishCategory.restaurant = restaurant;

    await this.dishCategoryRepository.save(dishCategory);
    return dishCategory;
  }

  async findOne(id: number) {
    const dishCategory = await this.dishCategoryRepository.findOneBy({ id });
    return dishCategory;
  }
}
