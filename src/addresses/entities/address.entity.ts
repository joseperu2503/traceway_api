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
import { AddressTag } from 'src/address-tags/entities/address-tag.entity';
import { AddressDeliveryDetail } from 'src/address-delivery-details/entities/address-delivery-detail.entity';
import { User } from 'src/auth/entities/user.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Cart } from 'src/carts/entities/cart.entity';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  locality: string;

  @Column('text')
  country: string;

  @Column('text')
  address: string;

  @Column('text')
  detail: string;

  @Column('text')
  references: string;

  @Column('double precision')
  latitude: number;

  @Column('double precision')
  longitude: number;

  //un Address tiene un AddressTag
  @ManyToOne(() => User, (user) => user.addresses)
  @JoinColumn({ name: 'user_id' })
  user: User;

  //un Address tiene un AddressTag
  @ManyToOne(() => AddressTag, (addressTag) => addressTag.addresses)
  @JoinColumn({ name: 'address_tag_id' })
  addressTag: AddressTag;

  //un Address tiene un AddressDeliveryDetail
  @ManyToOne(() => AddressDeliveryDetail, (addressTag) => addressTag.addresses)
  @JoinColumn({ name: 'address_delivery_id' })
  addressDeliveryDetail: AddressDeliveryDetail;

  @OneToMany(() => Order, (order) => order.address)
  orders: Order[];

  @OneToMany(() => Cart, (cart) => cart.address)
  carts: Cart[];

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
