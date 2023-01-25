import { ContractType } from '../data-types/main.data.types/contract-data-types'
import { ServiceCategory, Unit } from '../data-types/main.data.types/product-data-types'

export const initContract: ContractType = {
  id: '0',
  date: '2022.12.10',
  customer: {
    id: '0',
    companyName: 'Best Ever Ltd',
    address: [
      {
        primary: true,
        country: 'hungary',
        code: 'hu',
        city: 'budapest',
        building: 10,
        street: '7 Vezér street',
        zip: '1231',
      },
    ],
    access: [
      { primary: true, person: 'central', email: 'Chep@chep.com', telephone: '+36 32 000 001' },
      { primary: false, person: 'John Charter', email: 'Chep@chep.com', telephone: '+36 32 323 234' },
    ],
    social: [
      { media: 'facebook', link: 'https://www.facebook.com' },
      { media: 'twitter', link: 'https://www.twitter.com' },
    ],
    status: { lifecycleState: '', leadState: '' },
  },
  orders: [
    {
      order_id: '0',
      order_date: '2022.10.15',
      ordered_products: [
        {
          products_id: '0',
          products: [
            {
              id: '0',
              category: ServiceCategory.TRANSPORT,
              unitPrice: 1,
              currency: 'EUR',
              ordered_qty: 600,
              unit_dimension: Unit.DISTANCE_KM,
              other_information: 'domestic',
            },
            {
              id: '2',
              category: ServiceCategory.WAREHOUSING,
              unitPrice: 1.6,
              currency: 'EUR',
              ordered_qty: 3,
              unit_dimension: Unit.SQUARE_METER,
              other_information: 'main hq warehouseing service',
            },
            {
              id: '3',
              category: ServiceCategory.CUSTOM,
              unitPrice: 2000,
              currency: 'EUR',
              ordered_qty: 1,
              unit_dimension: Unit.PIECE,
              other_information: 'export custom procedure',
            },
          ],
        },
      ],
    },
    {
      order_id: '1',
      ordered_products: [
        {
          products_id: '0',
          products: [
            {
              id: '0',
              category: ServiceCategory.TRANSPORT,
              unitPrice: 1.3,
              currency: 'EUR',
              ordered_qty: 600,
              unit_dimension: Unit.DISTANCE_KM,
              other_information: 'hu-at lane',
            },
          ],
        },
      ],
      order_date: '2022.12.10',
    },
    {
      order_id: '2',
      ordered_products: [
        {
          products_id: '0',
          products: [
            {
              id: '0',
              category: ServiceCategory.TRANSPORT,
              unitPrice: 1.9,
              currency: 'EUR',
              ordered_qty: 2510,
              unit_dimension: Unit.DISTANCE_KM,
              other_information: 'hu-gb lane',
            },
          ],
        },
      ],
      order_date: '2022.12.20',
    },
  ],
}
