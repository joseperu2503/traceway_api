import { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { User } from 'src/auth/entities/user.entity';
import { CurrencyFormatter } from 'src/common/currency-formatter';
import { DateFormatter } from 'src/common/date-formatter';
import { OrderFormatter } from 'src/common/order-number-formatter';
import { Order } from 'src/orders/entities/order.entity';

const styles: StyleDictionary = {
  header: {
    fontSize: 22,
    bold: true,
    alignment: 'center',
    margin: [0, 50, 0, 20],
  },
  body: {
    alignment: 'justify',

    margin: [0, 0, 0, 70],
  },
  signature: {
    fontSize: 14,
    bold: true,
  },
  footer: {
    italics: true,
    alignment: 'center',
  },
};

const ORANGE = '#FE724C';
const YELLOW = '#FFC529';

export const orderInvoice = (
  order: Order,
  user: User,
): TDocumentDefinitions => {
  const docDefinition: TDocumentDefinitions = {
    styles: styles,
    pageMargins: [40, 40, 40, 20],
    content: [
      {
        margin: [0, 0, 0, 30],
        columns: [
          {
            stack: [
              //** Logo */
              {
                margin: [-10, 0, 0, 15],
                columns: [
                  {
                    image: 'assets/icons/icon.png',
                    width: 60,
                    height: 60,
                    alignment: 'left',
                    margin: [0, 0, 0, 0],
                  },
                  {
                    text: 'FoodDash',
                    fontSize: 32,
                    alignment: 'left',
                    font: 'SofiaProBold',
                    margin: [-2, 13, 0, 0],
                    color: ORANGE,
                  },
                ],
              },

              //** Datos del usuario */

              {
                columns: [
                  {
                    width: 20,
                    canvas: [
                      {
                        type: 'rect',
                        x: 0,
                        y: 0,
                        w: 8,
                        h: 80,
                        color: YELLOW,
                      },
                    ],
                  },
                  {
                    stack: [
                      {
                        text: 'BILLING TO:',
                        fontSize: 14,
                        alignment: 'left',
                        font: 'SofiaProSemiBold',
                        margin: [0, 5, 0, 7],
                      },
                      {
                        text: user.name,
                        alignment: 'left',
                        margin: [0, 0, 0, 6],
                      },
                      {
                        text: user.email,
                        alignment: 'left',
                        margin: [0, 0, 0, 6],
                      },
                      {
                        text: user.phone,
                        alignment: 'left',
                        margin: [0, 0, 0, 6],
                      },
                    ],
                  },
                ],
              },
            ],
            alignment: 'left',
          },
          {
            alignment: 'right',
            stack: [
              {
                text: 'INVOICE',
                fontSize: 32,
                alignment: 'right',
                font: 'SofiaProBold',
                margin: [0, 10, 0, 10],
              },
              {
                text: `#${OrderFormatter.number(order.id)}`,
                alignment: 'right',
                margin: [0, 0, 0, 5],
              },
              {
                text: `${DateFormatter.format(order.createdAt)}`,
                alignment: 'right',
              },
            ],
          },
        ],
      },

      //** Encabezado de la tabla */

      {
        layout: 'headerLineOnly',
        margin: [0, 0, 0, 20],
        table: {
          headerRows: 1,
          widths: ['*', 80, 60, 60],
          body: [
            [
              {
                text: 'DESCRIPTION',
                fillColor: '#111719',
                font: 'SofiaProSemiBold',
                margin: [10, 6],
                alignment: 'left',
                color: '#ffffff',
              },
              {
                text: 'QUANTITY',
                fillColor: '#111719',
                font: 'SofiaProSemiBold',
                margin: [10, 6],
                alignment: 'center',
                color: '#ffffff',
              },
              {
                text: 'PRICE',
                fillColor: '#111719',
                font: 'SofiaProSemiBold',
                margin: [10, 6],
                alignment: 'center',
                color: '#ffffff',
              },
              {
                text: 'TOTAL',
                fillColor: '#111719',
                font: 'SofiaProSemiBold',
                margin: [10, 6],
                alignment: 'center',
                color: '#ffffff',
              },
            ],
          ],
        },
      },
      //** Cuerpo de la tabla */

      {
        layout: 'headerLineOnly',
        margin: [0, 0, 0, 10],
        table: {
          widths: ['*', 80, 60, 60],
          body: [
            ...order.dishOrders.map((dishOrder) => [
              {
                text: dishOrder.dish.name,
                alignment: 'left',
                margin: [10, 10],
              },
              {
                text: dishOrder.units.toString(),
                alignment: 'center',
                margin: [10, 10],
              },
              {
                text: CurrencyFormatter.formatCurrency(dishOrder.dish.price),
                alignment: 'center',
                margin: [10, 10],
              },
              {
                text: CurrencyFormatter.formatCurrency(
                  dishOrder.dish.price * dishOrder.units,
                ),
                alignment: 'right',
                margin: [10, 10],
              },
            ]),
          ],
        },
      },

      //** QR y resumen */
      {
        columns: [
          {
            qr: 'https://joseperezgil.com',
            fit: 110,
            alignment: 'left',
            margin: [10, 20, 0, 0],
          },
          {
            width: 220,
            layout: 'headerLineOnly',
            table: {
              widths: [140, 60],
              body: [
                [
                  {
                    text: 'SUBTOTAL',
                    alignment: 'left',
                    margin: [10, 6],
                    font: 'SofiaProSemiBold',
                  },
                  {
                    text: CurrencyFormatter.formatCurrency(order.subtotal),
                    alignment: 'right',
                    margin: [10, 6],
                  },
                ],
                [
                  {
                    text: 'SERVICE FEE',
                    alignment: 'left',
                    margin: [10, 6],
                    font: 'SofiaProSemiBold',
                  },
                  {
                    text: CurrencyFormatter.formatCurrency(order.serviceFee),
                    alignment: 'right',
                    margin: [10, 6],
                  },
                ],
                [
                  {
                    text: 'DELIVERY FEE',
                    alignment: 'left',
                    margin: [10, 6],
                    font: 'SofiaProSemiBold',
                  },
                  {
                    text: CurrencyFormatter.formatCurrency(order.deliveryFee),
                    alignment: 'right',
                    margin: [10, 6],
                  },
                ],
                [
                  {
                    text: 'TOTAL',
                    alignment: 'left',
                    margin: [10, 6],
                    font: 'SofiaProSemiBold',
                    fillColor: YELLOW,
                  },
                  {
                    text: CurrencyFormatter.formatCurrency(order.total),
                    alignment: 'right',
                    margin: [10, 6],
                    fillColor: YELLOW,
                    font: 'SofiaProSemiBold',
                  },
                ],
              ],
            },
          },
        ],
      },

      //** Terminos y condiciones */

      {
        margin: [0, 60, 0, 0],
        columns: [
          {
            width: 30,
            margin: [-40, 0, 0, 0],
            canvas: [
              {
                type: 'rect',
                x: 0,
                y: 0,
                w: 60,
                h: 20,
                color: ORANGE,
              },
            ],
          },
          {
            width: 250,
            stack: [
              {
                text: 'TERMS & CONDITIONS:',
                fontSize: 14,
                alignment: 'left',
                font: 'SofiaProSemiBold',
                margin: [0, 0, 0, 7],
              },
              {
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea luptatem.',
                alignment: 'left',
              },
            ],
          },
        ],
      },
    ],
    footer: {
      text: 'This is a sample document for testing purposes only.',
      style: 'footer',
    },
    defaultStyle: {
      font: 'SofiaPro',
      color: '#111719',
    },
  };
  return docDefinition;
};
