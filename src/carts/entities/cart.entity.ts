import { Address } from 'src/addresses/entities/address.entity';
import { User } from 'src/auth/entities/user.entity';
import { DishCart } from 'src/carts/entities/dish-cart.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  //un Cart tiene un User
  @OneToOne(() => User, (user) => user.cart)
  @JoinColumn({ name: 'user_id' })
  user: User;

  //muchos Restaurant tienen un Cart
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.carts)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;

  @OneToMany(() => DishCart, (dishCart) => dishCart.cart)
  dishCarts: DishCart[];

  //muchos Address tiene un Order
  @ManyToOne(() => Address, (address) => address.carts)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @Column('float')
  subtotal: number;
}
