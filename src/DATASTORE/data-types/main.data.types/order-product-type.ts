import { Order as OrderType } from './order-data-types'
import { ServiceProductType } from './product-data-types'

export type OrderedProducts = {
  id: number
  products: ServiceProductType[]
}
