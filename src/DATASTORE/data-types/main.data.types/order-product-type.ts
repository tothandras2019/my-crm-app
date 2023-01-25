import { Order as OrderType } from './order-data-types'
import { ServiceProductType } from './product-data-types'

export type OrderedProducts = {
  products_id: string
  products: ServiceProductType[] | []
}
