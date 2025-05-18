import { Address } from 'src/addresses/entities/address.entity';
import { Cart } from 'src/carts/entities/cart.entity';
import { FavoriteDish } from 'src/favorites/entities/favorite-dish.entity';
import { Order } from 'src/orders/entities/order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text')
  password: string;

  @Column('text')
  name: string;

  @Column('text')
  surname: string;

  @Column('bool', {
    default: true,
    name: 'is_active',
  })
  isActive: boolean;

  @Column('text')
  phone: string;

  @Column('text', { nullable: true, name: 'mp_customer_id' })
  mpCustomerId: string;

  //un User tiene un Cart
  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => FavoriteDish, (favoriteDish) => favoriteDish.user)
  favoriteDishes: FavoriteDish[];

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
