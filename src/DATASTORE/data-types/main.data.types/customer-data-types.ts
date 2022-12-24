import { Order } from './order-data-types'

export type CustomerDataType = {
  id: number
  companyName: string
  address: AddressType[]
  access: AccessType[]
  social: SocialType[]
  status: StatusType
}

export type AddressType = {
  country: string
  code: string
  city: string
  building: number
  street: string
  zip: number
}

export type AccessType = { primary: boolean; email: string; telephone: string }
export type GeneralType = { [key: string]: string | number | null | undefined }

export type SocialType = { media: string; link: string }

export type StatusType = { lifecycleState: string; leadState: string }
