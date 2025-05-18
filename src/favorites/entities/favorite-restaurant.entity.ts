import { User } from 'src/auth/entities/user.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('favorite_restaurants')
export class FavoriteRestaurant {
  @PrimaryGeneratedColumn()
  id: number;

  //un FavoriteDish tiene un Restaurant
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.favoriteRestaurants)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;

  //un FavoriteDish tiene un User
  @ManyToOne(() => User, (user) => user.favoriteDishes)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
