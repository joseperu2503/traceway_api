import { Injectable } from '@nestjs/common';
import { CreateAddressTagDto } from './dto/create-address-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressTag } from './entities/address-tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddressTagsService {
  constructor(
    @InjectRepository(AddressTag)
    private readonly addressTagRepository: Repository<AddressTag>,
  ) {}

  async create(createAddressTagDto: CreateAddressTagDto) {
    const addressTag = this.addressTagRepository.create(createAddressTagDto);
    await this.addressTagRepository.save(addressTag);
  }
}
