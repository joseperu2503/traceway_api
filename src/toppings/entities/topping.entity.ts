import { Dish } from 'src/dishes/entities/dish.entity';
import { ToppingCategory } from 'src/topping-categories/entities/topping-category.entity';
import { ToppingDishCart } from 'src/carts/entities/topping-dish-cart.entity';
import { ToppingDishOrder } from 'src/topping-dish-orders/entities/topping-dish-order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('toppings')
export class Topping {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  description: string;

  @Column('bool', {
    default: true,
    name: 'is_active',
  })
  isActive: boolean;

  @Column('integer')
  maxLimit: number;

  @Column('float')
  price: number;

  //un Topping le pertenece a un ToppingCategory
  @ManyToOne(
    () => ToppingCategory,
    (toppingCategory) => toppingCategory.toppings,
  )
  @JoinColumn({ name: 'topping_category_id' })
  toppingCategory: ToppingCategory;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @ManyToMany(() => Dish, (dish) => dish.toppings)
  dishes: Dish[];

  @ManyToMany(
    () => ToppingDishCart,
    (toppingDishCart) => toppingDishCart.topping,
  )
  toppingDishCarts: ToppingDishCart[];

  @ManyToMany(
    () => ToppingDishOrder,
    (toppingDishOrder) => toppingDishOrder.topping,
  )
  toppingDishOrders: ToppingDishOrder[];
}
