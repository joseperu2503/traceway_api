import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from '../dto/create-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from '../entities/cart.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { DishCartsService } from 'src/carts/services/dish-carts.service';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { Address } from 'src/addresses/entities/address.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    private dishCartsService: DishCartsService,

    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,

    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async updateCart(createCartDto: CreateCartDto, user: User) {
    //**Eliminar el Cart existente */
    await this.emptyCart(user);

    //**Crear Cart */
    const cart = this.cartRepository.create();

    //**Buscar Restaurant */
    const restaurant = await this.restaurantRepository.findOne({
      where: { id: createCartDto.restaurantId },
    });

    if (!restaurant) {
      throw new NotFoundException(
        `Restaurant ${createCartDto.restaurantId} not found`,
      );
    }

    //**Buscar Address */
    const address = await this.addressRepository.findOne({
      where: {
        id: createCartDto.addressId,
        user: {
          id: user.id,
        },
      },
    });

    if (!address) {
      throw new NotFoundException(
        `Address ${createCartDto.addressId} not found`,
      );
    }

    cart.restaurant = restaurant;
    cart.address = address;
    cart.user = user;
    cart.subtotal = 0;

    await this.cartRepository.save(cart);

    let subtotal: number = 0;

    for (const dish of createCartDto.dishes) {
      const dishCart = await this.dishCartsService.create({
        ...dish,
        cartId: cart.id,
      });
      subtotal = subtotal + dishCart.units * dishCart.dish.price;
    }

    cart.subtotal = parseFloat(subtotal.toFixed(2));
    await this.cartRepository.save(cart);

    const myCart = await this.myCart(user);
    return myCart;
  }

  async myCart(user: User) {
    const cart = await this.cartRepository.findOne({
      where: {
        user: {
          id: user.id,
        },
      },
      select: {
        id: true,
        subtotal: true,
        address: {
          id: true,
          address: true,
          latitude: true,
          longitude: true,
        },
        restaurant: {
          id: true,
          name: true,
          address: true,
          logo: true,
          backdrop: true,
          latitude: true,
          longitude: true,
        },
        dishCarts: {
          id: true,
          units: true,
          dish: {
            id: true,
            name: true,
            image: true,
            price: true,
            description: true,
          },
          toppingDishCarts: {
            id: true,
            units: true,
            topping: {
              id: true,
              description: true,
              price: true,
            },
          },
        },
      },
      relations: {
        dishCarts: {
          dish: true,
          toppingDishCarts: {
            topping: true,
          },
        },
        restaurant: true,
        address: true,
      },
    });

    if (!cart) {
      return {
        success: true,
        data: null,
      };
    }
    const { dishCarts, ...rest } = cart;
    return {
      success: true,
      data: {
        ...rest,
        dishes: dishCarts.map((dishCart) => {
          return {
            ...dishCart.dish,
            units: dishCart.units,
            toppings: dishCart.toppingDishCarts.map((toppingDishCart) => {
              return {
                ...toppingDishCart.topping,
                units: toppingDishCart.units,
              };
            }),
          };
        }),
      },
    };
  }

  async emptyCart(user: User) {
    const cart = await this.cartRepository.findOne({
      where: {
        user: {
          id: user.id,
        },
      },
    });

    if (cart) {
      await this.cartRepository.delete(cart);
    }

    return {
      success: true,
      message: 'Your cart has been successfully emptied.',
    };
  }
}
