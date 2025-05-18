import { DishOrder } from 'src/dish-orders/entities/dish-order.entity';
import { Topping } from 'src/toppings/entities/topping.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('topping_dish_orders')
export class ToppingDishOrder {
  @PrimaryGeneratedColumn()
  id: number;

  //un ToppingDishOrder tiene un DishOrder
  @ManyToOne(() => DishOrder, (dishOrder) => dishOrder.toppingDishOrders, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'dish_order_id' })
  dishOrder: DishOrder;

  //muchos ToppingDishOrder tienen un Topping
  @ManyToOne(() => Topping, (topping) => topping.toppingDishOrders)
  @JoinColumn({ name: 'topping_id' })
  topping: Topping;

  @Column('int')
  units: number;
}
