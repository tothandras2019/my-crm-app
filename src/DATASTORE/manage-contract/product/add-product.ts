import { off } from 'process'
import { ContractType } from '../../data-types/main.data.types/contract-data-types'
import { Order } from '../../data-types/main.data.types/order-data-types'
import { OrderedProducts } from '../../data-types/main.data.types/order-product-type'
import { ServiceProductType } from '../../data-types/main.data.types/product-data-types'
import { DeclareContract, SplitContract } from './product-managers'

export const ADD_PRODUCT_TO_ORDER = (orderID: string, contract: ContractType, product: ServiceProductType): ContractType => {
  const { contract_order, filtered_contract_order } = SplitContract(contract, orderID)
  if (!contract_order) return contract

  const contract_order__order_products: OrderedProducts = contract_order.ordered_products[0]
  const new_products: ServiceProductType[] = [...contract_order__order_products.products, product]

  const new_contract_orders = DeclareContract(contract_order, filtered_contract_order, contract_order__order_products, new_products, product)

  const return_contract = { ...contract, orders: new_contract_orders }
  return return_contract
}
