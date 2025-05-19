import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { LocationsController } from './controllers/locations.controller';
import { Location } from './entities/location.entity';
import { LocationsService } from './services/locations.service';

@Module({
  controllers: [LocationsController],
  providers: [LocationsService],
  imports: [TypeOrmModule.forFeature([Location]), AuthModule],
})
export class LocationModule {}
