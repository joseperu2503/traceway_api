import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';
import { DishCategoriesModule } from 'src/dish-categories/dish-categories.module';
import { DishesModule } from 'src/dishes/dishes.module';
import { ToppingsModule } from 'src/toppings/toppings.module';
import { ToppingCategoriesModule } from 'src/topping-categories/topping-categories.module';
import { AddressDeliveryDetailsModule } from 'src/address-delivery-details/address-delivery-details.module';
import { AddressTagsModule } from 'src/address-tags/address-tags.module';
import { CardsModule } from 'src/cards/cards.module';
import { OrdersModule } from 'src/orders/orders.module';
import { AuthModule } from 'src/auth/auth.module';
import { AddressesModule } from 'src/addresses/addresses.module';
import { FavoritesModule } from 'src/favorites/favorites.module';

@Module({
  providers: [SeedService],
  imports: [
    RestaurantsModule,
    DishCategoriesModule,
    DishesModule,
    ToppingsModule,
    ToppingCategoriesModule,
    AddressDeliveryDetailsModule,
    AddressTagsModule,
    CardsModule,
    OrdersModule,
    AuthModule,
    AddressesModule,
    FavoritesModule,
  ],
  exports: [SeedService],
})
export class SeedModule {}
