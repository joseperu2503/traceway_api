import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateToppingDishCartDto } from '../dto/create-topping-dish-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ToppingDishCart } from '../entities/topping-dish-cart.entity';
import { Repository } from 'typeorm';
import { DishCart } from 'src/carts/entities/dish-cart.entity';
import { Topping } from 'src/toppings/entities/topping.entity';

@Injectable()
export class ToppingDishCartsService {
  constructor(
    @InjectRepository(ToppingDishCart)
    private readonly toppingDishCartRepository: Repository<ToppingDishCart>,
    @InjectRepository(DishCart)
    private readonly dishCartRepository: Repository<DishCart>,
    @InjectRepository(Topping)
    private readonly toppingRepository: Repository<Topping>,
  ) {}

  async create(createToppingDishCartDto: CreateToppingDishCartDto) {
    const toppingDishCart = this.toppingDishCartRepository.create(
      createToppingDishCartDto,
    );

    const dishCart = await this.dishCartRepository.findOne({
      where: { id: createToppingDishCartDto.dishCartId },
    });

    if (!dishCart) {
      throw new NotFoundException(
        `Dish cart ${createToppingDishCartDto.dishCartId} not found`,
      );
    }

    const topping = await this.toppingRepository.findOne({
      where: { id: createToppingDishCartDto.toppingId },
    });

    if (!topping) {
      throw new NotFoundException(
        `Topping ${createToppingDishCartDto.toppingId} not found`,
      );
    }

    toppingDishCart.dishCart = dishCart;
    toppingDishCart.topping = topping;

    await this.toppingDishCartRepository.save(toppingDishCart);
    return dishCart;
  }
}
