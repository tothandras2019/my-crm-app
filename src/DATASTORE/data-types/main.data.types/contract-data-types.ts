import { CustomerDataType } from './customer-data-types'
import { Order } from './order-data-types'

export type ContractType = {
  id: number
  date: number
  customer: CustomerDataType
  orders: Order[]
}
