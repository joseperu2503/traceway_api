import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from 'src/addresses/entities/address.entity';

@Entity('address_tags')
export class AddressTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @OneToMany(() => Address, (address) => address.addressTag)
  addresses: Address[];
}
