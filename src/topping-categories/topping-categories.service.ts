import { Injectable } from '@nestjs/common';
import { CreateToppingCategoryDto } from './dto/create-topping-category.dto';
import { ToppingCategory } from './entities/topping-category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';

@Injectable()
export class ToppingCategoriesService {
  constructor(
    @InjectRepository(ToppingCategory)
    private readonly toppingCategoryRepository: Repository<ToppingCategory>,

    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {}

  async create(createToppingCategoryDto: CreateToppingCategoryDto) {
    const toppingCategory = this.toppingCategoryRepository.create(
      createToppingCategoryDto,
    );

    const restaurant = await this.restaurantRepository.findOne({
      where: { id: createToppingCategoryDto.restaurantId },
    });

    if (!restaurant) {
      return;
    }

    toppingCategory.restaurant = restaurant;

    await this.toppingCategoryRepository.save(toppingCategory);
    return toppingCategory;
  }

  async findOne(id: number) {
    const toppingCategory = await this.toppingCategoryRepository.findOneBy({
      id,
    });

    return toppingCategory;
  }
}
