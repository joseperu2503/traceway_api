import { Module } from '@nestjs/common';
import { MercadoPagoService } from './mercado-pago.service';

@Module({
  controllers: [],
  providers: [MercadoPagoService],
  exports: [MercadoPagoService],
})
export class MercadoPagoModule {}
