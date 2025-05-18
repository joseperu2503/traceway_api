import { Module } from '@nestjs/common';
import { CartsService } from './services/carts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { DishCart } from 'src/carts/entities/dish-cart.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { Address } from 'src/addresses/entities/address.entity';
import { CartController } from './controllers/carts.controller';
import { DishCartsService } from './services/dish-carts.service';
import { DishesModule } from 'src/dishes/dishes.module';
import { ToppingDishCartsService } from 'src/carts/services/topping-dish-carts.service';
import { ToppingDishCart } from './entities/topping-dish-cart.entity';
import { Topping } from 'src/toppings/entities/topping.entity';

@Module({
  controllers: [CartController],
  providers: [CartsService, DishCartsService, ToppingDishCartsService],
  imports: [
    TypeOrmModule.forFeature([
      Cart,
      DishCart,
      Restaurant,
      Address,
      ToppingDishCart,
      Topping,
    ]),
    DishesModule,
    AuthModule,
  ],
  exports: [CartsService, DishCartsService, ToppingDishCartsService],
})
export class CartsModule {}
