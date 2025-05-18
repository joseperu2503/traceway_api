import { Module } from '@nestjs/common';
import { ToppingsService } from './toppings.service';
import { ToppingsController } from './toppings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topping } from './entities/topping.entity';
import { ToppingCategoriesModule } from 'src/topping-categories/topping-categories.module';

@Module({
  controllers: [ToppingsController],
  providers: [ToppingsService],
  imports: [TypeOrmModule.forFeature([Topping]), ToppingCategoriesModule],
  exports: [ToppingsService],
})
export class ToppingsModule {}
