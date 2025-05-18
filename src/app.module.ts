import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { SeedModule } from './seed/seed.module';
import { DishCategoriesModule } from './dish-categories/dish-categories.module';
import { DishesModule } from './dishes/dishes.module';
import { AuthModule } from './auth/auth.module';
import { ToppingsModule } from './toppings/toppings.module';
import { ToppingCategoriesModule } from './topping-categories/topping-categories.module';
import { CartsModule } from './carts/carts.module';
import { AppController } from './app.controller';
import { AddressTagsModule } from './address-tags/address-tags.module';
import { AddressesModule } from './addresses/addresses.module';
import { AddressDeliveryDetailsModule } from './address-delivery-details/address-delivery-details.module';
import { MercadoPagoModule } from './mercado-pago/mercado-pago.module';
import { CardsModule } from './cards/cards.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentMethodsModule } from './payment-methods/payment-methods.module';
import { DishOrdersModule } from './dish-orders/dish-orders.module';
import { ToppingDishOrdersModule } from './topping-dish-orders/topping-dish-orders.module';
import { SeedCommand } from './seed/seed.command';
import { FavoritesModule } from './favorites/favorites.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PrinterModule } from './printer/printer.module';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      database: process.env.DB_NAME,
      username: process.env.DB_USERMAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: false,
    }),
    EventEmitterModule.forRoot(),
    RestaurantsModule,
    SeedModule,
    DishCategoriesModule,
    DishesModule,
    AuthModule,
    ToppingsModule,
    ToppingCategoriesModule,
    CartsModule,
    AddressTagsModule,
    AddressesModule,
    AddressDeliveryDetailsModule,
    MercadoPagoModule,
    CardsModule,
    OrdersModule,
    PaymentMethodsModule,
    DishOrdersModule,
    ToppingDishOrdersModule,
    FavoritesModule,
    PrinterModule,
  ],
  providers: [SeedCommand],
})
export class AppModule {}
