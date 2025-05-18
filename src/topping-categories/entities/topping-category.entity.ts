import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { Topping } from 'src/toppings/entities/topping.entity';
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

@Entity('topping_categories')
export class ToppingCategory {
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
  maxToppings: number;

  @Column('integer')
  minToppings: number;

  //un ToppingCategory le pertenece a un ToppingType
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.toppingCategories)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;

  //un ToppingCategory tiene muchos Topping
  @OneToMany(() => Topping, (topping) => topping.toppingCategory)
  toppings: Topping[];

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
