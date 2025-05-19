import {
  Injectable
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from '../entities/location.entity';
import { CreateLocationParams } from '../interfaces/create-location-params.interface';
import { FindLocationResult } from '../interfaces/find-location-result.interface';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async create(params: CreateLocationParams) {
    const location = await this.locationRepository.save(params);
    return location;
  }

  async findAll(userId: string) {
    return this.locationRepository.find({ where: { userId } });
  }

  async findOne(id: string): Promise<FindLocationResult | null> {
    const location = await this.locationRepository.findOne({
      where: { id },
    });

    if (!location) {
      return null;
    }

    return {
      id: location.id,
      mainText: location.mainText,
      secondaryText: location.secondaryText,
      latitude: location.latitude,
      longitude: location.longitude,
      userId: location.userId,
    };
  }

  async delete(id: string) {
    return this.locationRepository.delete(id);
  }
}
