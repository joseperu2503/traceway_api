import { Dish } from 'src/dishes/entities/dish.entity';
import { Order } from 'src/orders/entities/order.entity';
import { ToppingDishOrder } from 'src/topping-dish-orders/entities/topping-dish-order.entity';
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

@Entity('dish_orders')
export class DishOrder {
  @PrimaryGeneratedColumn()
  id: number;

  //un DishOrder tiene un Dish
  @ManyToOne(() => Dish, (dish) => dish.dishOrders)
  @JoinColumn({ name: 'dish_id' })
  dish: Dish;

  //un DishOrder tiene un Order
  @ManyToOne(() => Order, (order) => order.dishOrders, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column('int')
  units: number;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  //un DishOrder tiene muchas ToppingDishOrder
  @OneToMany(
    () => ToppingDishOrder,
    (toppingDishOrder) => toppingDishOrder.dishOrder,
  )
  toppingDishOrders: ToppingDishOrder[];
}
