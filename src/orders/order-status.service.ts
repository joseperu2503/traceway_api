import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderStatusDto } from './dto/create-order-status.dto';
import { OrderStatus } from './entities/order-status.entity';

@Injectable()
export class OrderStatusesService {
  constructor(
    @InjectRepository(OrderStatus)
    private readonly orderStatusRepository: Repository<OrderStatus>,
  ) {}

  async create(createOrderStatusDto: CreateOrderStatusDto) {
    const orderStatusType =
      this.orderStatusRepository.create(createOrderStatusDto);
    await this.orderStatusRepository.save(orderStatusType);
  }
}
