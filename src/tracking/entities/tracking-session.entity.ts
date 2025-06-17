import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('traking_sessions')
export class TrackingSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { name: 'user_id' })
  userId: string;

  @Column('text', { name: 'destination_place_id' })
  destinationPlaceId: string;

  @Column('text', { name: 'start_date' })
  startDate: Date;

  @Column('text', { name: 'end_date' })
  endDate: Date;

  @Column('text', { name: 'estimated_date_end' })
  estimatedDateEnd: Date;

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
