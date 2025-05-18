import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { SeedService } from './seed.service';

@Module({
  providers: [SeedService],
  imports: [AuthModule],
  exports: [SeedService],
})
export class SeedModule {}
