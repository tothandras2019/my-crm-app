import { CustomerDataType } from './customer-data-types'
import { Order } from './order-data-types'

export type ContractType = {
  id: string
  date: string
  customer: CustomerDataType
  orders: Order[]
}
