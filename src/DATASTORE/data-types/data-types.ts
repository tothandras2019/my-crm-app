export type GeneralType = { [key: string]: string | number | null | undefined }
export type SocialType = { media: string; link: string }
export type ContractType = { total: number; achieved: number }
export type ContactsType = { name: string; position: string; email: string }

export type StatusType = { lifecycleState: string; leadState: string }
export type ProductType = { category: string; name: string; quantity: number; price: number }

export type AddressType = {
  country: string
  code: string
  city: string
  building: number
  street: string
  zip: number
}

export type ProductsName = { [key: string]: string }

export enum ProductCategoryEnum {
  product = 'product',
  service = 'service',
}
export enum LeadEnum {
  open = 'open',
  inProgress = 'in_progress',
  openDeal = 'open_deal',
  unqualified = 'unqualified',
  attemptedToContact = 'attempted_To_Contact',
  connected = 'connected',
  badTiming = 'bad_Timing',
}
export enum LifecicyleEnum {
  subscriber = 'subscriber',
  lead = 'lead',
  marketingQualified = 'marketing/qualified ',
  salesQualified = 'sales/qualified ',
  opportunity = 'opportunity ',
  customer = 'customer',
  closing = 'closing',
  evangelist = 'evangelist ',
  other = 'other',
}
export type InitCustomersType = {
  id: number
  companyName: string
  contacts: ContactsType[]
  address: AddressType[]
  access: GeneralType[]
  social: SocialType[]
  status: StatusType
  contract: ContractType
  subscribed: { products: ProductType[] }
  period: GeneralType
}
