import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity('order_statuses')
export class OrderStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', {
    unique: true,
  })
  name: string;

  @OneToMany(() => Order, (order) => order.orderStatus)
  orders: Order[];
}
