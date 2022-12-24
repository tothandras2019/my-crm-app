import { Order as OrderType } from './order-data-types'
import { ProductType } from './product-data-types'

export type OrderedProducts = {
  id: number
  products: ProductType[]
}
