import { Module } from '@nestjs/common';
import { ToppingDishOrdersService } from './topping-dish-orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DishOrder } from 'src/dish-orders/entities/dish-order.entity';
import { Topping } from 'src/toppings/entities/topping.entity';
import { ToppingDishOrder } from './entities/topping-dish-order.entity';

@Module({
  providers: [ToppingDishOrdersService],
  imports: [TypeOrmModule.forFeature([ToppingDishOrder, DishOrder, Topping])],
  exports: [ToppingDishOrdersService],
})
export class ToppingDishOrdersModule {}
