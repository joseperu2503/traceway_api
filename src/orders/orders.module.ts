import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { AuthModule } from 'src/auth/auth.module';
import { DishOrder } from 'src/dish-orders/entities/dish-order.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { Address } from 'src/addresses/entities/address.entity';
import { DishOrdersModule } from 'src/dish-orders/dish-orders.module';
import { OrderStatus } from './entities/order-status.entity';
import { OrderStatusesService } from './order-status.service';
import { CartsModule } from 'src/carts/carts.module';
import { OrdersGateway } from './orders.gateway';
import { PrinterModule } from 'src/printer/printer.module';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, OrderStatusesService, OrdersGateway],
  imports: [
    TypeOrmModule.forFeature([
      Order,
      DishOrder,
      Restaurant,
      Address,
      OrderStatus,
    ]),
    DishOrdersModule,
    AuthModule,
    CartsModule,
    PrinterModule,
  ],
  exports: [OrdersService, OrderStatusesService],
})
export class OrdersModule {}
