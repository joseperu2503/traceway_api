import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { OrdersService } from './orders.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interfaces';

@WebSocketGateway({ cors: true, namespace: '/orders' })
export class OrdersGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly ordersService: OrdersService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private eventEmitter: EventEmitter2,

    private readonly jwtService: JwtService,
  ) {
    this.eventEmitter.on('order.upcomingOrdersUpdated', (user: User) =>
      this.emitUpcomingOrdersUpdated(user),
    );
  }

  async handleConnection(client: Socket) {
    // console.log('Client connected:', client.id);
    const token = client.handshake.headers.authorization as string;
    let payload: JwtPayload;

    try {
      payload = this.jwtService.verify(token);
      const user = await this.userRepository.findOneBy({ id: payload.id });

      if (!user) {
        client.disconnect();
        return;
      }

      client.join(`user-${user.id}`);
      console.log(`Client ${client.id} joined user-${user.id} channel`);

      this.emitUpcomingOrdersUpdated(user);
    } catch (error) {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    // console.log('Client disconnected:', client.id);
  }

  //** Método para emitir el estado de la orden a todos los clientes en el canal */
  async emitUpcomingOrdersUpdated(user: User) {
    // console.log(`emit orden ${order.id} actualizada ${order.orderStatus.name}`);

    const orders = await this.ordersService.upcomingOrders(user);
    const room = `user-${user.id}`;
    this.server.to(room).emit('upcomingOrdersUpdated', orders);
  }

  //** Método para emitir el estado de la orden a todos los clientes en el canal */
  async emitDeliveredOrdersUpdated(user: User) {
    const orders = await this.ordersService.deliveredOrders(user);
    const room = `user-${user.id}`;
    this.server.to(room).emit('deliveredOrdersUpdated', orders);
  }
}
