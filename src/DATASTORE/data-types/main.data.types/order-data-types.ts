import { OrderedProducts as OrderedProductType } from './order-product-type'

export type Order = {
  order_id: string
  order_date: string
  ordered_products: OrderedProductType[]
}
