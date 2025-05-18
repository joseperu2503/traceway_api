import { RestaurantCategory } from 'src/restaurants/entities/restaurant-category.entity';
import { DishCategory } from 'src/dish-categories/entities/dish-category.entity';
import { ToppingCategory } from 'src/topping-categories/entities/topping-category.entity';
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
import { Cart } from 'src/carts/entities/cart.entity';
import { Order } from 'src/orders/entities/order.entity';
import { FavoriteRestaurant } from 'src/favorites/entities/favorite-restaurant.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('restaurants')
export class Restaurant {
  @ApiProperty({
    description: 'Unique identifier for the restaurant',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Name of the restaurant',
    uniqueItems: true,
  })
  @Column('text', {
    unique: true,
  })
  name: string;

  @ApiProperty({
    description: 'Address of the restaurant',
  })
  @Column('text')
  address: string;

  @ApiProperty({
    description: 'URL of the restaurant logo',
  })
  @Column('text')
  logo: string;

  @ApiProperty({
    description: 'URL of the restaurant backdrop',
  })
  @Column('text')
  backdrop: string;

  @ApiProperty({
    description: 'Latitude of the restaurant location',
  })
  @Column('double precision')
  latitude: number;

  @ApiProperty({
    description: 'Longitude of the restaurant location',
  })
  @Column('double precision')
  longitude: number;

  @Column('bool', {
    default: true,
    name: 'is_active',
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Opening time of the restaurant',
  })
  @Column('time', { name: 'open_time' })
  openTime: string;

  @ApiProperty({
    description: 'Closing time of the restaurant',
  })
  @Column('time', { name: 'close_time' })
  closeTime: string;

  // Muchos restaurantes tienen una categoría
  @ManyToOne(
    () => RestaurantCategory,
    (restaurantcategory) => restaurantcategory.restaurants,
  )
  @JoinColumn({ name: 'restaurant_category_id' })
  restaurantCategory: RestaurantCategory;

  @OneToMany(() => DishCategory, (dishCategory) => dishCategory.restaurant)
  dishCategories: DishCategory[];

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  // Un Restaurant tiene muchas ToppingCategory
  @OneToMany(
    () => ToppingCategory,
    (toppingCategory) => toppingCategory.restaurant,
  )
  toppingCategories: ToppingCategory[];

  // Un Restaurant tiene muchas Cart
  @OneToMany(() => Cart, (cart) => cart.restaurant)
  carts: Cart[];

  // Un Restaurant tiene muchas Order
  @OneToMany(() => Order, (order) => order.restaurant)
  orders: Order[];

  // Un Restaurant tiene muchos FavoriteRestaurants
  @OneToMany(
    () => FavoriteRestaurant,
    (favoriteRestaurant) => favoriteRestaurant.restaurant,
  )
  favoriteRestaurants: FavoriteRestaurant[];
}
