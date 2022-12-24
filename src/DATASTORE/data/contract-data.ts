import { InitCustomersType, LifecicyleEnum, LeadEnum, ProductCategoryEnum } from './../data-types/data-types'

export const InitCustomers: InitCustomersType = {
  id: 0,
  companyName: 'Videoton',
  contacts: [{ name: 'John Markers', position: 'general manager', email: 'jmarkers@gmail.com' }],
  address: [
    {
      country: 'Australia',
      code: 'AU',
      city: 'Perth',
      building: 34,
      street: 'Whitehouse lane',
      zip: 143234,
    },
  ],
  access: [{ email: 'Chep@chep.com' }, { telephone: '+36 32 323 234' }],
  social: [{ media: 'facebook', link: 'https://www.facebook.com' }],
  status: {
    lifecycleState: LifecicyleEnum.subscriber,
    leadState: LeadEnum.open,
  },
  contract: {
    total: 23425,
  },
  subscribed: {
    products: [
      { id: 0, category: ProductCategoryEnum.service, name: 'transport', quantity: 34, price: 2000 },
      { id: 1, category: ProductCategoryEnum.product, name: 'charger', quantity: 23, price: 2700 },
      { id: 2, category: ProductCategoryEnum.service, name: 'transport', quantity: 21, price: 1500 },
    ],
  },
  period: { from: 2021, to: 2025 },
}
