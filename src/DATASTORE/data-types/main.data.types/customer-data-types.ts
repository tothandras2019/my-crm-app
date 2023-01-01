import { Order } from './order-data-types'

export type CustomerDataType = {
  id: string
  companyName: string
  address: AddressType[]
  access: AccessType[]
  social: SocialType[]
  status: StatusType
}

export type AddressType = {
  primary: boolean
  country: string
  code: string
  city: string
  building: number
  street: string
  zip: number
}

export type AccessType = { primary: boolean; person: string; email: string; telephone: string }
export type GeneralType = { [key: string]: string | number | null | undefined }

export type SocialType = { media: string; link: string }

export type StatusType = { lifecycleState: string; leadState: string }

export type SummaryCustomerOrdersAmountType = {
  id: string
  date: string
  companyName: string
  address: AddressType[]
  access: AccessType[]
  social: SocialType[]
  status: StatusType
  summaryOrdersamount: number
}
