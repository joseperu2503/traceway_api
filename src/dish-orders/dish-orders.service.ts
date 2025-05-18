import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDishOrderDto } from './dto/create-dish-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DishOrder } from './entities/dish-order.entity';
import { Repository } from 'typeorm';
import { Dish } from 'src/dishes/entities/dish.entity';
import { Order } from 'src/orders/entities/order.entity';
import { ToppingDishOrdersService } from 'src/topping-dish-orders/topping-dish-orders.service';

@Injectable()
export class DishOrdersService {
  constructor(
    @InjectRepository(DishOrder)
    private readonly dishOrderRepository: Repository<DishOrder>,
    @InjectRepository(Dish)
    private readonly dishRepository: Repository<Dish>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private toppingDishOrdersService: ToppingDishOrdersService,
  ) {}

  async create(createDishOrderDto: CreateDishOrderDto): Promise<DishOrder> {
    const { toppings, ...dishOrderDetails } = createDishOrderDto;

    const dishOrder = this.dishOrderRepository.create(dishOrderDetails);

    const dish = await this.dishRepository.findOne({
      where: { id: createDishOrderDto.dishId },
    });
    if (!dish) {
      throw new NotFoundException(
        `Dish ${createDishOrderDto.dishId} not found`,
      );
    }

    dishOrder.dish = dish;

    const order = await this.orderRepository.findOne({
      where: { id: createDishOrderDto.orderId },
    });
    if (!order) {
      throw new NotFoundException(
        `Order ${createDishOrderDto.orderId} not found`,
      );
    }

    dishOrder.order = order;
    await this.dishOrderRepository.save(dishOrder);

    for (const topping of toppings) {
      await this.toppingDishOrdersService.create({
        dishOrderId: dishOrder.id,
        toppingId: topping.toppingId,
        units: topping.units,
      });
    }

    return dishOrder;
  }
}
