import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('restaurant_categories')
export class RestaurantCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', {
    unique: true,
  })
  name: string;

  @Column('text')
  image: string;

  @Column('bool', {
    default: true,
    name: 'is_active',
  })
  isActive: boolean;

  @OneToMany(() => Restaurant, (restaurant) => restaurant.restaurantCategory)
  restaurants: Restaurant[];

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
