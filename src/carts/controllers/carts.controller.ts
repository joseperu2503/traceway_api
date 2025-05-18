import { Controller, Get, Post, Body, Delete, Put } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { JwtAuth } from 'src/auth/decorators/jwt-auth.decorator';
import { CartsService } from '../services/carts.service';
import { CreateCartDto } from '../dto/create-cart.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('cart')
@ApiBearerAuth()
@ApiTags('Cart')
@JwtAuth()
export class CartController {
  constructor(private readonly cartService: CartsService) {}

  @Get()
  @ApiOperation({
    summary: "Retrieve the authenticated user's cart",
  })
  @ApiResponse({
    status: 200,
    description:
      'Successfully retrieved the cart details for the authenticated user.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  myCart(@GetUser() user: User) {
    return this.cartService.myCart(user);
  }

  @ApiOperation({
    summary: 'Update the cart for the authenticated user',
  })
  @ApiBody({
    type: CreateCartDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the cart.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  @Put()
  updateCart(@Body() createCartDto: CreateCartDto, @GetUser() user: User) {
    return this.cartService.updateCart(createCartDto, user);
  }

  @Delete()
  @ApiOperation({
    summary: 'Empty the cart for the authenticated user',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully emptied the cart for the authenticated user.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  emptyCart(@GetUser() user: User) {
    return this.cartService.emptyCart(user);
  }
}
