import { User } from 'src/auth/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PlaceEntity } from './place.entity';

@Entity('user_places')
export class UserPlaceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.userPlaces)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => PlaceEntity, (place) => place.userPlaces)
  @JoinColumn({ name: 'place_id' })
  place: PlaceEntity;

  @Column({
    type: 'timestamptz',
    name: 'last_used_at',
    nullable: true,
  })
  lastUsedAt: Date | null;

  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
