import { PlaceEntity } from 'src/places/entities/place.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TrackingSession } from '../models/tracking-session.model';
import { TrackingSessionStatus } from './tracking-session-status.entity';

@Entity('tracking_sessions')
export class TrackingSessionEntity implements TrackingSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { name: 'user_id' })
  userId: string;

  @Column('text', { name: 'destination_place_id' })
  destinationPlaceId: string;

  @Column('double precision')
  radius: number;

  @ManyToOne(() => PlaceEntity, (place) => place.trackingSessions)
  @JoinColumn({ name: 'destination_place_id' })
  destinationPlace: PlaceEntity;

  @Column({
    type: 'timestamptz',
    name: 'start_date',
  })
  startDate: Date;

  @Column({
    type: 'timestamptz',
    name: 'end_date',
    nullable: true,
  })
  endDate: Date | null;

  @Column({
    type: 'timestamptz',
    name: 'estimated_end_date',
    nullable: true,
  })
  estimatedEndDate: Date;

  @ManyToOne(() => TrackingSessionStatus, (status) => status.trackingSessions)
  @JoinColumn({ name: 'status_id' })
  status: TrackingSessionStatus;

  @Column({ name: 'status_id' })
  statusId: string;

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
