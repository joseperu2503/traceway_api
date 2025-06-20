import { UserEntity } from 'src/auth/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { PlaceEntity } from './place.entity';

@Entity('user_places')
export class UserPlaceEntity {
  @PrimaryColumn({ name: 'user_id', type: 'uuid' })
  userId: string;

  @PrimaryColumn({ name: 'place_id', type: 'uuid' })
  placeId: string;

  @ManyToOne(() => UserEntity, (user) => user.userPlaces)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => PlaceEntity, (place) => place.userPlaces)
  @JoinColumn({ name: 'place_id' })
  place: PlaceEntity;

  @Column({
    type: 'timestamptz',
    name: 'last_used_at',
  })
  lastUsedAt: Date;
}
