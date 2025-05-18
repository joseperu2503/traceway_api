import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { User } from 'src/auth/entities/user.entity';
import {
  DataSource,
  FindOptionsSelect,
  In,
  MoreThan,
  Repository,
} from 'typeorm';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { Order } from './entities/order.entity';
import { DishOrdersService } from 'src/dish-orders/dish-orders.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/addresses/entities/address.entity';
import { OrderStatus } from './entities/order-status.entity';
import moment from 'moment';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';
import { PrinterService } from 'src/printer/printer.service';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import { CartsService } from 'src/carts/services/carts.service';
import { orderInvoice } from 'src/printer/reports/order-invoice';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    private readonly dishOrdersService: DishOrdersService,

    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,

    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,

    @InjectRepository(OrderStatus)
    private readonly orderStatusRepository: Repository<OrderStatus>,

    private readonly dataSource: DataSource,

    private readonly cartsService: CartsService,

    private readonly eventEmitter: EventEmitter2,

    private readonly printerService: PrinterService,
  ) {}

  async create(createOrderDto: CreateOrderDto, user: User) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      //**Crear Order */
      const order = this.orderRepository.create();

      //**Buscar Restaurant */
      const restaurant = await this.restaurantRepository.findOne({
        where: { id: createOrderDto.restaurantId },
      });
      if (!restaurant) {
        throw new NotFoundException(
          `Restaurant ${createOrderDto.restaurantId} not found`,
        );
      }
      order.restaurant = restaurant;

      //**Buscar Address */
      const address = await this.addressRepository.findOne({
        where: {
          id: createOrderDto.addressId,
          user: {
            id: user.id,
          },
        },
      });

      if (!address) {
        throw new NotFoundException(
          `Address ${createOrderDto.addressId} not found`,
        );
      }

      order.address = address;

      // **Buscar OrderStatusType con ID 1**
      const orderStatus1 = await this.orderStatusRepository.findOne({
        where: { id: 1 },
      });

      if (!orderStatus1) {
        throw new InternalServerErrorException();
      }

      order.orderStatus = orderStatus1;

      order.user = user;

      const deliveryFee: number = 3.9;
      const serviceFee: number = 4.9;

      order.deliveryFee = deliveryFee;
      order.serviceFee = serviceFee;

      order.subtotal = 0;
      order.total = 0;

      await this.orderRepository.save(order);

      let subtotal: number = 0;
      //** Crear DishOrders */
      for (const dish of createOrderDto.dishes) {
        const dishOrder = await this.dishOrdersService.create({
          ...dish,
          orderId: order.id,
        });
        subtotal = subtotal + dishOrder.units * dishOrder.dish.price;
      }

      order.subtotal = parseFloat(subtotal.toFixed(2));
      order.total = parseFloat(
        (subtotal + deliveryFee + serviceFee).toFixed(2),
      );
      await this.orderRepository.save(order);

      //** Limpiar el Cart del User */
      this.cartsService.emptyCart(user);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      this.initAutoUpdateOrderStatus(order, user);

      this.eventEmitter.emit('order.upcomingOrdersUpdated', user);

      return this.findOne(user, order.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw new InternalServerErrorException(error);
    }
  }

  async initAutoUpdateOrderStatus(order: Order, user: User) {
    await this.delay(10000);
    await this.updateOrderStatus(order, 2, user);
    await this.delay(10000);
    await this.updateOrderStatus(order, 3, user);
    await this.delay(10000);
    await this.updateOrderStatus(order, 4, user);
  }

  async updateOrderStatus(order: Order, orderStatusId: number, user: User) {
    const orderStatus = await this.orderStatusRepository.findOneBy({
      id: orderStatusId,
    });

    if (!orderStatus) return;

    order.orderStatus = orderStatus;

    if (orderStatusId == 4) {
      order.deliveredDate = new Date();
    }

    await this.orderRepository.save(order);

    //** Emitir la actualización del Order */
    this.eventEmitter.emit('order.upcomingOrdersUpdated', user);
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async myOrders(
    user: User,
    orderStatuses: number[],
    page: number,
    limit: number,
  ) {
    const orders = await paginate<Order>(
      this.orderRepository,
      {
        page: page,
        limit: limit,
      },
      {
        where: {
          user: {
            id: user.id,
          },
          orderStatus: {
            id: In(orderStatuses),
          },
        },
        order: {
          createdAt: 'DESC',
        },
        select: this.getOrderSelect(),
        relations: {
          dishOrders: {
            dish: true,
            toppingDishOrders: {
              topping: true,
            },
          },
          restaurant: true,
          address: true,
          orderStatus: true,
        },
      },
    );

    return new Pagination(
      orders.items.map((order) => {
        return {
          ...order,
          estimatedDelivery: {
            min: moment(order.createdAt).add(30, 'minute'),
            max: moment(order.createdAt).add(45, 'minute'),
          },
        };
      }),
      orders.meta,
      orders.links,
    );
  }

  async upcomingOrders(user: User) {
    const orders = await this.orderRepository.find({
      where: [
        {
          user: {
            id: user.id,
          },
          orderStatus: {
            id: In([1, 2, 3]),
          },
        },
      ],
      order: {
        createdAt: 'DESC',
      },
      select: this.getOrderSelect(),
      relations: {
        dishOrders: {
          dish: true,
          toppingDishOrders: {
            topping: true,
          },
        },
        restaurant: true,
        address: true,
        orderStatus: true,
      },
    });

    return orders.map((order) => {
      return {
        ...order,
        estimatedDelivery: {
          min: moment(order.createdAt).add(30, 'minute'),
          max: moment(order.createdAt).add(45, 'minute'),
        },
      };
    });
  }

  async deliveredOrders(user: User) {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    const orders = await this.orderRepository.find({
      where: [
        {
          user: {
            id: user.id,
          },
          orderStatus: {
            id: 4,
          },
          deliveredDate: MoreThan(fiveMinutesAgo),
        },
      ],
      order: {
        createdAt: 'DESC',
      },
      select: this.getOrderSelect(),
      relations: {
        dishOrders: {
          dish: true,
          toppingDishOrders: {
            topping: true,
          },
        },
        restaurant: true,
        address: true,
        orderStatus: true,
      },
    });

    return orders.map((order) => {
      return {
        ...order,
        estimatedDelivery: {
          min: moment(order.createdAt).add(30, 'minute'),
          max: moment(order.createdAt).add(45, 'minute'),
        },
      };
    });
  }

  async findOne(user: User, orderId: number) {
    const order = await this.orderRepository.findOne({
      where: {
        user: {
          id: user.id,
        },
        id: orderId,
      },
      select: this.getOrderSelect(),
      relations: {
        dishOrders: {
          dish: true,
          toppingDishOrders: {
            topping: true,
          },
        },
        restaurant: true,
        address: true,
        orderStatus: true,
      },
    });

    if (!order) return null;

    return {
      ...order,
      estimatedDelivery: {
        min: moment(order.createdAt).add(30, 'minute'),
        max: moment(order.createdAt).add(45, 'minute'),
      },
    };
  }

  private getOrderSelect(): FindOptionsSelect<Order> {
    return {
      id: true,
      subtotal: true,
      deliveryFee: true,
      serviceFee: true,
      total: true,
      createdAt: true,
      deliveredDate: true,
      address: {
        id: true,
        address: true,
        latitude: true,
        longitude: true,
      },
      restaurant: {
        id: true,
        name: true,
        address: true,
        logo: true,
        backdrop: true,
        latitude: true,
        longitude: true,
      },
      dishOrders: {
        id: true,
        units: true,
        dish: {
          id: true,
          name: true,
          image: true,
          price: true,
          description: true,
        },
        toppingDishOrders: {
          id: true,
          units: true,
          topping: {
            id: true,
            description: true,
            price: true,
          },
        },
      },
      orderStatus: {
        id: true,
        name: true,
      },
    };
  }

  async invoice(user: User, orderId: number) {
    const order = await this.findOne(user, orderId);

    if (!order) {
      throw new NotFoundException(`Order ${orderId} not found`);
    }

    const docDefinition: TDocumentDefinitions = orderInvoice(order, user);

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }
}
