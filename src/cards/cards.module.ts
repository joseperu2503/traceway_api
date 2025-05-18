import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { MercadoPagoModule } from 'src/mercado-pago/mercado-pago.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CardsController],
  providers: [CardsService],
  imports: [MercadoPagoModule, AuthModule],
  exports: [CardsService],
})
export class CardsModule {}
