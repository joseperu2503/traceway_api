import { Injectable } from '@nestjs/common';
import { CreateAddressDeliveryDetailDto } from './dto/create-address-delivery-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressDeliveryDetail } from './entities/address-delivery-detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddressDeliveryDetailsService {
  constructor(
    @InjectRepository(AddressDeliveryDetail)
    private readonly addressDeliverDetailRepository: Repository<AddressDeliveryDetail>,
  ) {}

  async create(createAddressDeliveryDetailDto: CreateAddressDeliveryDetailDto) {
    const addressDeliveryDetail = this.addressDeliverDetailRepository.create(
      createAddressDeliveryDetailDto,
    );
    await this.addressDeliverDetailRepository.save(addressDeliveryDetail);
  }
}
