import { ContractType } from '../../data-types/main.data.types/contract-data-types'
import { OrderedProducts } from '../../data-types/main.data.types/order-product-type'
import { ServiceProductType } from '../../data-types/main.data.types/product-data-types'
import { DeclareContract, SplitContract } from './product-managers'

export const DELETE_PRODUCT_ON_ORDER = (orderID: string, contract: ContractType, selected_product: ServiceProductType): ContractType => {
  const { contract_order, filtered_contract_order } = SplitContract(contract, orderID)
  if (!contract_order) return contract

  const contract_order__order_products: OrderedProducts = contract_order.ordered_products[0]
  const left_product = contract_order__order_products.products.filter((product) => product.id !== selected_product.id)

  const new_products: ServiceProductType[] = [...left_product]

  const new_contract_orders = DeclareContract(contract_order, filtered_contract_order, contract_order__order_products, new_products, selected_product)

  const return_contract = { ...contract, orders: new_contract_orders }
  return return_contract
}
