import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tracking_sessions')
export class TrackingSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { name: 'user_id' })
  userId: string;

  @Column('text', { name: 'destination_place_id' })
  destinationPlaceId: string;

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
    name: 'estimated_date_end',
    nullable: true,
  })
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
