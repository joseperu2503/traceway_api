import { Dish } from 'src/dishes/entities/dish.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
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

@Entity('dish_categories')
export class DishCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', {
    unique: true,
  })
  name: string;

  @Column('bool', {
    default: true,
    name: 'is_active',
  })
  isActive: boolean;

  //una DishCategory tiene muchas Dish
  @OneToMany(() => Dish, (dish) => dish.dishCategory)
  dishes: Dish[];

  //muchas DishCategory tienen una Restaurant
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.dishCategories)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
