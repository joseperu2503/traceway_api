import { PartialType } from '@nestjs/mapped-types';
import { CreateAddressTagDto } from './create-address-tag.dto';

export class UpdateAddressTagDto extends PartialType(CreateAddressTagDto) {}
