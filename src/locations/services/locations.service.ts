import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from '../entities/location.entity';
import { CreateLocationParams } from '../interfaces/create-location-params.interface';

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

  async delete(id: string, userId: string) {
    const location = await this.locationRepository.findOne({ where: { id } });

    if (!location) {
      throw new NotFoundException('Location not found');
    }

    if (location.userId !== userId) {
      throw new ForbiddenException(
        'You are not allowed to delete this location',
      );
    }

    await this.locationRepository.delete(id);
    return { message: 'Location deleted successfully' };
  }
}
