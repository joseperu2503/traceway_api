import { Module } from '@nestjs/common';
import { PaymentMethodsService } from './payment-methods.service';
import { PaymentMethodsController } from './payment-methods.controller';
import { CardsModule } from 'src/cards/cards.module';
import { AuthModule } from 'src/auth/auth.module';
import { MercadoPagoModule } from 'src/mercado-pago/mercado-pago.module';

@Module({
  controllers: [PaymentMethodsController],
  providers: [PaymentMethodsService],
  imports: [CardsModule, AuthModule, MercadoPagoModule],
})
export class PaymentMethodsModule {}
