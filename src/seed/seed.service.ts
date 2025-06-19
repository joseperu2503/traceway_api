import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth.service';
import { TrackingSessionStatus } from 'src/tracking/entities/tracking-session-status.entity';
import { DataSource } from 'typeorm';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly authService: AuthService,
  ) {}

  async runSeed() {
    // await this.dropAllTables();
    // await this.userSeed();
    await this.trackingSessionsStatusSeed();
  }

  private async userSeed() {
    const users = initialData.users;
    for (const user of users) {
      await this.authService.register(user);
    }
  }

  private async trackingSessionsStatusSeed() {
    const statuses = initialData.trackingSessionsStatuses;

    const repo = this.dataSource.getRepository(TrackingSessionStatus);

    // Evitar duplicados si ya existen
    for (const status of statuses) {
      const exists = await repo.findOneBy({ id: status.id });
      if (!exists) {
        await repo.insert(status);
      }
    }
  }

  async dropAllTables(): Promise<void> {
    await this.dataSource.dropDatabase();
    await this.dataSource.synchronize();
  }
}
