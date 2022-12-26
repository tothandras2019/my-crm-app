import { CustomerDataType } from './customer-data-types'
import { Order } from './order-data-types'

export type ContractType = {
  id: number
  date: string
  customer: CustomerDataType
  orders: Order[]
}
