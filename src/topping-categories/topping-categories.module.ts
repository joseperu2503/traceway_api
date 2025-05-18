import { Module } from '@nestjs/common';
import { ToppingCategoriesService } from './topping-categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToppingCategory } from './entities/topping-category.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';

@Module({
  controllers: [],
  providers: [ToppingCategoriesService],
  imports: [TypeOrmModule.forFeature([ToppingCategory, Restaurant])],
  exports: [ToppingCategoriesService],
})
export class ToppingCategoriesModule {}
