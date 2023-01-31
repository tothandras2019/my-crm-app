import { ContractType } from '../../data-types/main.data.types/contract-data-types'
import { Order } from '../../data-types/main.data.types/order-data-types'
import { OrderedProducts } from '../../data-types/main.data.types/order-product-type'
import { ServiceProductType } from '../../data-types/main.data.types/product-data-types'

export const SplitContract = (contract: ContractType, orderID: string) => {
  const contract_order = contract.orders.find((order) => order.order_id === orderID)
  const filtered_contract_order = contract.orders.filter((order) => order.order_id !== orderID)

  return { contract_order: contract_order, filtered_contract_order: filtered_contract_order }
}

export const DeclareContract = (
  contract: Order,
  filtered_Orders: Order[],
  OrderedProduct: OrderedProducts,
  new_products: ServiceProductType[],
  product: ServiceProductType,
) => {
  const new_ordered_products: OrderedProducts = { ...OrderedProduct, products: new_products }
  const new_contract_order__order_products: OrderedProducts[] = [new_ordered_products]
  const new_contract_order: Order = { ...contract, ordered_products: new_contract_order__order_products }
  const new_contract_orders: Order[] = [...filtered_Orders, new_contract_order]
  return new_contract_orders
}
