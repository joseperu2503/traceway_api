import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { TrackingSessionEntity } from './tracking-session.entity';

@Entity('tracking_sessions_status')
export class TrackingSessionStatus {
  @PrimaryColumn()
  id: string;

  @Column('text', { name: 'name' })
  name: string;

  @OneToMany(() => TrackingSessionEntity, (ts) => ts.status)
  trackingSessions: TrackingSessionEntity[];
}
