import { UserEntity } from 'src/auth/entities/user.entity';
import { TrackingSessionEntity } from 'src/tracking/entities/tracking-session.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PlaceModel } from '../models/place-model';
import { UserPlaceEntity } from './user-place.entity';

@Entity('places')
export class PlaceEntity implements PlaceModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { name: 'main_text' })
  mainText: string;

  @Column('text', { name: 'secondary_text' })
  secondaryText: string;

  @Column('double precision')
  latitude: number;

  @Column('double precision')
  longitude: number;

  @ManyToMany(() => UserEntity, (user) => user.places)
  users: UserEntity[];

  @OneToMany(() => UserPlaceEntity, (ul) => ul.place)
  userPlaces: UserPlaceEntity[];

  @OneToMany(() => TrackingSessionEntity, (ts) => ts.status)
  trackingSessions: TrackingSessionEntity[];

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
