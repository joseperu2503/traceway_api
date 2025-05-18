import { PartialType } from '@nestjs/mapped-types';
import { CreateAddressDeliveryDetailDto } from './create-address-delivery-detail.dto';

export class UpdateAddressDeliveryDetailDto extends PartialType(
  CreateAddressDeliveryDetailDto,
) {}
