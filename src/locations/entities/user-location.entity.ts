import { User } from 'src/auth/entities/user.entity';
import {
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { Location } from './location.entity';

@Entity('user_locations')
export class UserLocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.userLocations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Location, (location) => location.userLocations)
  @JoinColumn({ name: 'location_id' })
  location: Location;

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
