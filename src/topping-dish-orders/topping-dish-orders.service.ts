import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateToppingDishOrderDto } from './dto/create-topping-dish-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ToppingDishOrder } from './entities/topping-dish-order.entity';
import { Repository } from 'typeorm';
import { DishOrder } from 'src/dish-orders/entities/dish-order.entity';
import { Topping } from 'src/toppings/entities/topping.entity';

@Injectable()
export class ToppingDishOrdersService {
  constructor(
    @InjectRepository(ToppingDishOrder)
    private readonly toppingDishCartRepository: Repository<ToppingDishOrder>,
    @InjectRepository(DishOrder)
    private readonly dishOrderRepository: Repository<DishOrder>,
    @InjectRepository(Topping)
    private readonly toppingRepository: Repository<Topping>,
  ) {}

  async create(createToppingDishOrderDto: CreateToppingDishOrderDto) {
    const toppingDishCart = this.toppingDishCartRepository.create(
      createToppingDishOrderDto,
    );

    const dishOrder = await this.dishOrderRepository.findOne({
      where: { id: createToppingDishOrderDto.dishOrderId },
    });

    if (!dishOrder) {
      throw new NotFoundException(
        `Dish order ${createToppingDishOrderDto.dishOrderId} not found`,
      );
    }

    const topping = await this.toppingRepository.findOne({
      where: { id: createToppingDishOrderDto.toppingId },
    });

    if (!topping) {
      throw new NotFoundException(
        `Topping ${createToppingDishOrderDto.toppingId} not found`,
      );
    }

    toppingDishCart.dishOrder = dishOrder;
    toppingDishCart.topping = topping;

    await this.toppingDishCartRepository.save(toppingDishCart);
    return dishOrder;
  }
}
