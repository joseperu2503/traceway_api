import { Module } from '@nestjs/common';
import { AddressTagsService } from './address-tags.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressTag } from './entities/address-tag.entity';

@Module({
  controllers: [],
  providers: [AddressTagsService],
  imports: [TypeOrmModule.forFeature([AddressTag])],
  exports: [AddressTagsService],
})
export class AddressTagsModule {}
