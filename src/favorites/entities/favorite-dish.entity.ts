import { User } from 'src/auth/entities/user.entity';
import { Dish } from 'src/dishes/entities/dish.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('favorite_dishes')
export class FavoriteDish {
  @PrimaryGeneratedColumn()
  id: number;

  //un FavoriteDish tiene un Dish
  @ManyToOne(() => Dish, (dish) => dish.favoriteDishes)
  @JoinColumn({ name: 'dish_id' })
  dish: Dish;

  //un FavoriteDish tiene un User
  @ManyToOne(() => User, (user) => user.favoriteDishes)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
