import { Module } from '@nestjs/common';
import { AddressDeliveryDetailsService } from './address-delivery-details.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressDeliveryDetail } from './entities/address-delivery-detail.entity';

@Module({
  controllers: [],
  providers: [AddressDeliveryDetailsService],
  imports: [TypeOrmModule.forFeature([AddressDeliveryDetail])],
  exports: [AddressDeliveryDetailsService],
})
export class AddressDeliveryDetailsModule {}
