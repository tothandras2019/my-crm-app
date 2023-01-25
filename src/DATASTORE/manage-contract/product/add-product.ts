import { off } from 'process'
import { ContractType } from '../../data-types/main.data.types/contract-data-types'
import { Order } from '../../data-types/main.data.types/order-data-types'
import { OrderedProducts } from '../../data-types/main.data.types/order-product-type'
import { ServiceProductType } from '../../data-types/main.data.types/product-data-types'

export const ADD_PRODUCT_TO_ORDER = (orderID: string, contract: ContractType, product: ServiceProductType): ContractType => {
  const { contract_order, filtered_contract_order } = SplitContract(contract, orderID)
  if (!contract_order) return contract

  const contract_order__order_products: OrderedProducts = contract_order.ordered_products[0]
  const new_products: ServiceProductType[] = [...contract_order__order_products.products, product]

  const new_contract_orders = DeclareContract(contract_order, filtered_contract_order, contract_order__order_products, new_products, product)

  const return_contract = { ...contract, orders: new_contract_orders }
  return return_contract
}

export const UPDATE_PRODUCT_ON_ORDER = (orderID: string, contract: ContractType, product: ServiceProductType): ContractType => {
  const { contract_order, filtered_contract_order } = SplitContract(contract, orderID)
  if (!contract_order) return contract

  const contract_order__order_products: OrderedProducts = contract_order.ordered_products[0]
  const left_product = contract_order__order_products.products.filter((product) => product.id !== product.id)
  const new_products: ServiceProductType[] = [...left_product, product]

  const new_contract_orders = DeclareContract(contract_order, filtered_contract_order, contract_order__order_products, new_products, product)

  const return_contract = { ...contract, orders: new_contract_orders }
  return return_contract
}

export const DELETE_PRODUCT_ON_ORDER = (orderID: string, contract: ContractType, selected_product: ServiceProductType): ContractType => {
  console.log('[product id]:', selected_product)

  const { contract_order, filtered_contract_order } = SplitContract(contract, orderID)
  if (!contract_order) return contract

  const contract_order__order_products: OrderedProducts = contract_order.ordered_products[0]
  const left_product = contract_order__order_products.products.filter((product) => product.id !== selected_product.id)

  const new_products: ServiceProductType[] = [...left_product]

  const new_contract_orders = DeclareContract(contract_order, filtered_contract_order, contract_order__order_products, new_products, selected_product)

  const return_contract = { ...contract, orders: new_contract_orders }
  return return_contract
}

const SplitContract = (contract: ContractType, orderID: string) => {
  const contract_order = contract.orders.find((order) => order.order_id === orderID)
  const filtered_contract_order = contract.orders.filter((order) => order.order_id !== orderID)

  return { contract_order: contract_order, filtered_contract_order: filtered_contract_order }
}

const DeclareContract = (
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
