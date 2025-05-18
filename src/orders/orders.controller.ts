import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Query,
  DefaultValuePipe,
  Res,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuth } from 'src/auth/decorators/jwt-auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller('orders')
@ApiExcludeController()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @JwtAuth()
  create(@Body() createOrderDto: CreateOrderDto, @GetUser() user: User) {
    return this.ordersService.create(createOrderDto, user);
  }

  @Get('my-orders')
  @JwtAuth()
  myOrders(
    @GetUser() user: User,
    @Query('orderStatuses') orderStatuses: string = '1,2,3,4',
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    // Aquí separamos los valores de orderStatuses y los convertimos a un array de números
    const orderStatusesArray = orderStatuses
      ? orderStatuses.split(',').map(Number)
      : [];

    return this.ordersService.myOrders(user, orderStatusesArray, page, limit);
  }

  @Get(':id/invoice')
  @JwtAuth()
  async invoice(
    @Res() response,
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ) {
    const pdfDoc = await this.ordersService.invoice(user, id);

    response.setHeader('Content-type', 'application/pdf');
    pdfDoc.info.Title = 'Constancia';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get(':id')
  @JwtAuth()
  findOne(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.ordersService.findOne(user, id);
  }
}
