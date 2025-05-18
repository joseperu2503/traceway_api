import { Module } from '@nestjs/common';
import { DishOrdersService } from './dish-orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DishOrder } from './entities/dish-order.entity';
import { Dish } from 'src/dishes/entities/dish.entity';
import { Order } from 'src/orders/entities/order.entity';
import { DishesModule } from 'src/dishes/dishes.module';
import { ToppingDishOrdersModule } from 'src/topping-dish-orders/topping-dish-orders.module';

@Module({
  providers: [DishOrdersService],
  imports: [
    TypeOrmModule.forFeature([DishOrder, Dish, Order]),
    DishesModule,
    ToppingDishOrdersModule,
  ],
  exports: [DishOrdersService],
})
export class DishOrdersModule {}
