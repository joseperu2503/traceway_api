import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from 'src/addresses/entities/address.entity';

@Entity('address_delivery_detail')
export class AddressDeliveryDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @OneToMany(() => Address, (address) => address.addressDeliveryDetail)
  addresses: Address[];
}
