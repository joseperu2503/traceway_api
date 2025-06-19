import { User } from 'src/auth/entities/user.entity';
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

  @ManyToMany(() => User, (user) => user.places)
  users: User[];

  @OneToMany(() => UserPlaceEntity, (ul) => ul.place)
  userPlaces: UserPlaceEntity[];

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
