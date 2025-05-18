import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from 'src/auth/entities/user.entity';
import { MercadoPagoService } from 'src/mercado-pago/mercado-pago.service';

@Injectable()
export class PaymentMethodsService {
  constructor(private readonly mercadoPagoService: MercadoPagoService) {}

  async myPaymentMethods(user: User) {
    try {
      const cards = await this.mercadoPagoService.getCards(user.mpCustomerId);
      return [
        {
          id: 'cash',
          description: 'Cash',
          expirationMonth: null,
          expirationYear: null,
          firstSixDigits: null,
          lastFourDigits: null,
          issuer: null,
          cardHolder: {
            name: null,
          },
          image:
            'https://files.joseperezgil.com/images/traceway/static/cash.png',
        },
        ...cards.map((card) => {
          let image: string | null = null;

          if (card.issuer?.name == 'Mastercard') {
            image =
              'https://files.joseperezgil.com/images/traceway/static/mastercard.png';
          }

          if (card.issuer?.name == 'Visa') {
            image =
              'https://files.joseperezgil.com/images/traceway/static/visa.png';
          }

          return {
            id: card.id,
            description:
              card.payment_method?.payment_type_id == 'debit_card'
                ? 'Debit card'
                : 'Credit card',
            expirationMonth: card.expiration_month,
            expirationYear: card.expiration_year,
            firstSixDigits: card.first_six_digits,
            lastFourDigits: card.last_four_digits,
            issuer: card.issuer?.name,
            cardHolder: {
              name: card.cardholder?.name,
            },
            image: image,
          };
        }),
      ];
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
