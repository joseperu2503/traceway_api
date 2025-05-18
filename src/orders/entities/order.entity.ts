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
import { User } from 'src/auth/entities/user.entity';
import { Address } from 'src/addresses/entities/address.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { DishOrder } from 'src/dish-orders/entities/dish-order.entity';
import { OrderStatus } from './order-status.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  //un Order tiene un User
  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  //muchos Address tiene un Order
  @ManyToOne(() => Address, (address) => address.orders)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  //un Order tienen un Restaurant
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.orders)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;

  //Un Order tiene un OrderStatus
  @ManyToOne(() => OrderStatus, (orderStatus) => orderStatus.orders)
  @JoinColumn({ name: 'order_status_id' })
  orderStatus: OrderStatus;

  @OneToMany(() => DishOrder, (dishOrder) => dishOrder.order)
  dishOrders: DishOrder[];

  @Column('float')
  subtotal: number;

  @Column('float', { name: 'delivery_fee' })
  deliveryFee: number;

  @Column('float', { name: 'service_fee' })
  serviceFee: number;

  @Column('float')
  total: number;

  @Column('bool', { name: 'delivery_notification_read', default: false })
  deliveryNotificationRead: boolean;

  @Column('timestamptz', { name: 'delivered_date', nullable: true })
  deliveredDate: Date;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
