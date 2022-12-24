import { ContractType } from '../data-types/main.data.types/contract-data-types'
import { Category, Unit } from '../data-types/main.data.types/product-data-types'

export const initContract: ContractType = {
  id: 0,
  date: 1234,
  customer: {
    id: 0,
    companyName: 'Best Ever Ltd',
    address: [
      {
        country: 'hungary',
        code: 'hu',
        city: 'budapest',
        building: 10,
        street: 'Vezér street',
        zip: 1231,
      },
    ],
    access: [
      { primary: true, email: 'Chep@chep.com', telephone: '+36 32 000 001' },
      { primary: false, email: 'Chep@chep.com', telephone: '+36 32 323 234' },
    ],
    social: [
      { media: 'facebook', link: 'https://www.facebook.com' },
      { media: 'twitter', link: 'https://www.twitter.com' },
    ],
    status: { lifecycleState: '', leadState: '' },
  },
  orders: [
    {
      order_id: 0,
      order_date: '2022.10.15',
      ordered_products: [
        {
          id: 0,
          products: [
            {
              id: 0,
              category: Category.TRANSPORT,
              name: 'string',
              unitPrice: 2000,
              unit: Unit.DISTANCE_KM,
              stock_qty: undefined,
              ordered_qty: 1,
            },
            {
              id: 2,
              category: Category.WAREHOUSING,
              name: 'string',
              unitPrice: 2000,
              unit: Unit.SQUARE_METER,
              stock_qty: 10,
              ordered_qty: 3,
            },
            {
              id: 3,
              category: Category.CUSTOM,
              name: 'string',
              unitPrice: 2000,
              unit: Unit.PIECE,
              stock_qty: undefined,
              ordered_qty: 1,
            },
          ],
        },
      ],
    },
    {
      order_id: 1,
      ordered_products: [
        {
          id: 0,
          products: [
            {
              id: 0,
              category: Category.TRANSPORT,
              name: 'string',
              unitPrice: 500,
              unit: Unit.DISTANCE_KM,
              stock_qty: undefined,
              ordered_qty: 1,
            },
          ],
        },
      ],
      order_date: '2022.12.10',
    },
    {
      order_id: 2,
      ordered_products: [],
      order_date: '2022.12.20',
    },
  ],
}
