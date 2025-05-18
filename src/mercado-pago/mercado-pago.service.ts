import { Injectable } from '@nestjs/common';

import {
  MercadoPagoConfig,
  CustomerCard,
  CardToken,
  Customer,
} from 'mercadopago';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class MercadoPagoService {
  constructor() {
    this.client = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN ?? '',
      options: { timeout: 5000, idempotencyKey: 'abc' },
    });
  }

  private client: MercadoPagoConfig;

  async getCards(customerId: string) {
    try {
      const customerCard = new CustomerCard(this.client);
      const cards = await customerCard.list({
        customerId: customerId,
      });
      return cards;
    } catch (error) {
      throw error;
    }
  }

  async getCard(customerId: string, cardId: string) {
    try {
      const customerCard = new CustomerCard(this.client);
      const card = await customerCard.get({
        cardId: cardId,
        customerId: customerId,
      });
      return card;
    } catch (error) {
      throw error;
    }
  }

  async createCard(token: string, customerId: string) {
    try {
      const customerCard = new CustomerCard(this.client);
      const newCustomerCard = await customerCard.create({
        body: {
          token: token,
        },
        customerId: customerId,
      });
      return newCustomerCard;
    } catch (error) {
      throw error;
    }
  }

  async deleteCard(cardId: string, customerId: string) {
    try {
      const customerCard = new CustomerCard(this.client);
      const newCustomerCard = await customerCard.remove({
        cardId: cardId,
        customerId: customerId,
      });
      return newCustomerCard;
    } catch (error) {
      throw error;
    }
  }

  async createCustomer(user: User) {
    try {
      const customer = new Customer(this.client);
      const newCustomer = await customer.create({
        body: {
          first_name: user.name,
          last_name: user.surname,
          email: user.email,
          phone: {
            number: user.phone,
          },
        },
      });
      return newCustomer;
    } catch (error) {
      throw error;
    }
  }

  async searchCustomer(user: User) {
    try {
      const customer = new Customer(this.client);
      const search = await customer.search({
        options: {
          email: user.email,
        },
      });
      return search;
    } catch (error) {
      throw error;
    }
  }

  async createToken(cardId: string, securityCode: string) {
    try {
      const customer = new CardToken(this.client);
      const newCustomer = await customer.create({
        body: {
          card_id: cardId,
          security_code: securityCode,
        },
      });
      return newCustomer;
    } catch (error) {
      throw error;
    }
  }
}
