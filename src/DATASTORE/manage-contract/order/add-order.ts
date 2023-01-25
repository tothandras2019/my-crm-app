import { ContractType } from '../../data-types/main.data.types/contract-data-types'
import { Order } from '../../data-types/main.data.types/order-data-types'
import { OrderedProducts } from '../../data-types/main.data.types/order-product-type'
import { ID_GENERATOR } from '../../side-functions/id-generator'

export const ADD_ORDER_TO_CONTRACT = (contract: ContractType): ContractType => {
  const { id, date, customer, orders } = contract

  const newOrderedProducts: OrderedProducts = { products_id: '1', products: [] }

  const newOrder: Order = {
    order_id: ID_GENERATOR({ type: 'order' }),
    order_date: new Date().toLocaleString(),
    ordered_products: [newOrderedProducts],
  }

  const newContrat: ContractType = { id: id, date: date, customer: customer, orders: [...orders, newOrder] }
  return newContrat
}
