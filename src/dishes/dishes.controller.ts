import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DishesService } from './dishes.service';
import { JwtAuth } from 'src/auth/decorators/jwt-auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';

@ApiTags('Dishes')
@Controller('dishes')
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  @Get(':id')
  @JwtAuth(true)
  @ApiOperation({
    summary: 'Retrieve details of a specific dish',
    description: 'Returns detailed information about a specific dish by ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the dish',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Dish details retrieved successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Dish not found.',
  })
  findOne(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.dishesService.findOne(id, user);
  }

  @Get(':id/toppings')
  @ApiOperation({
    summary: 'Retrieve toppings for a specific dish',
    description:
      'Returns a list of available toppings for a specific dish by ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the dish',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'List of toppings retrieved successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Dish not found.',
  })
  toppings(@Param('id', ParseIntPipe) id: number) {
    return this.dishesService.toppings(id);
  }
}
