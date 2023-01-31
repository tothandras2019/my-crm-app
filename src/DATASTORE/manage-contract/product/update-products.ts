import { ContractType } from '../../data-types/main.data.types/contract-data-types'
import { OrderedProducts } from '../../data-types/main.data.types/order-product-type'
import { ServiceProductType } from '../../data-types/main.data.types/product-data-types'
import { DeclareContract, SplitContract } from './product-managers'

export const UPDATE_PRODUCT_ON_ORDER = (orderID: string, contract: ContractType, product: ServiceProductType): ContractType => {
  // console.log('[UPDATE_PRODUCT_ON_ORDER - new_products]:', product)
  const { contract_order, filtered_contract_order } = SplitContract(contract, orderID)
  if (!contract_order) return contract

  const contract_order__order_products: OrderedProducts = contract_order.ordered_products[0]
  const left_product = contract_order__order_products.products.filter((order_products_product) => order_products_product.id !== product.id)
  const new_products: ServiceProductType[] = [...left_product, product]

  const new_contract_orders = DeclareContract(contract_order, filtered_contract_order, contract_order__order_products, new_products, product)

  const return_contract = { ...contract, orders: new_contract_orders }
  return return_contract
}
