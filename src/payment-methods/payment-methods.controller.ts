import { Controller, Get } from '@nestjs/common';
import { PaymentMethodsService } from './payment-methods.service';
import { JwtAuth } from 'src/auth/decorators/jwt-auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('payment-methods')
export class PaymentMethodsController {
  constructor(private readonly paymentMethodsService: PaymentMethodsService) {}

  @Get('my-payment-methods')
  @JwtAuth()
  myCards(@GetUser() user: User) {
    return this.paymentMethodsService.myPaymentMethods(user);
  }
}
