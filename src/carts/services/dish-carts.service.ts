import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDishCartDto } from '../dto/create-dish-cart.dto';
import { DishCart } from '../entities/dish-cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ToppingDishCartsService } from 'src/carts/services/topping-dish-carts.service';
import { Cart } from 'src/carts/entities/cart.entity';
import { Dish } from 'src/dishes/entities/dish.entity';

@Injectable()
export class DishCartsService {
  constructor(
    @InjectRepository(DishCart)
    private readonly dishCartRepository: Repository<DishCart>,
    @InjectRepository(Dish)
    private readonly dishRepository: Repository<Dish>,
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    private toppingDishCartsService: ToppingDishCartsService,
  ) {}

  async create(createDishCartDto: CreateDishCartDto) {
    const { toppings, ...dishCartDetails } = createDishCartDto;

    const dishCart = this.dishCartRepository.create(dishCartDetails);

    const dish = await this.dishRepository.findOne({
      where: { id: createDishCartDto.dishId },
    });
    if (!dish) {
      throw new NotFoundException(`Dish ${createDishCartDto.dishId} not found`);
    }

    dishCart.dish = dish;

    const cart = await this.cartRepository.findOne({
      where: { id: createDishCartDto.cartId },
    });
    if (!cart) {
      throw new NotFoundException(`Cart ${createDishCartDto.cartId} not found`);
    }

    dishCart.cart = cart;
    await this.dishCartRepository.save(dishCart);

    for (const topping of toppings) {
      await this.toppingDishCartsService.create({
        dishCartId: dishCart.id,
        toppingId: topping.toppingId,
        units: topping.units,
      });
    }

    return dishCart;
  }
}
