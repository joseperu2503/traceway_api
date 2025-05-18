import { Cart } from 'src/carts/entities/cart.entity';
import { Dish } from 'src/dishes/entities/dish.entity';
import { ToppingDishCart } from 'src/carts/entities/topping-dish-cart.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('dish_carts')
export class DishCart {
  @PrimaryGeneratedColumn()
  id: number;

  //un DishCart tiene un Dish
  @ManyToOne(() => Dish, (dish) => dish.dishCarts)
  @JoinColumn({ name: 'dish_id' })
  dish: Dish;

  //un DishCart tiene un Cart
  @ManyToOne(() => Cart, (cart) => cart.dishCarts, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @Column('int')
  units: number;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  //un DishCart tiene muchas ToppingDishCart
  @OneToMany(
    () => ToppingDishCart,
    (toppingDishCart) => toppingDishCart.dishCart,
  )
  toppingDishCarts: ToppingDishCart[];
}
