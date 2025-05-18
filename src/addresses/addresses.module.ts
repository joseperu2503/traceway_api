import { Module } from '@nestjs/common';
import { AddressesService } from './services/addresses.service';
import { AddressesController } from './controllers/addresses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { AuthModule } from 'src/auth/auth.module';
import { AddressTag } from 'src/address-tags/entities/address-tag.entity';
import { AddressDeliveryDetail } from 'src/address-delivery-details/entities/address-delivery-detail.entity';
import { GoogleMapsService } from './services/google-maps.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [AddressesController],
  providers: [AddressesService, GoogleMapsService],
  imports: [
    TypeOrmModule.forFeature([Address, AddressTag, AddressDeliveryDetail]),
    AuthModule,
    HttpModule,
  ],
  exports: [AddressesService],
})
export class AddressesModule {}
