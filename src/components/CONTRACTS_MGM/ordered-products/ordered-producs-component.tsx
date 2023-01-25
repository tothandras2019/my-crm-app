import './ordered-producs-component.css'
import { OrderedProducts } from '../../../DATASTORE/data-types/main.data.types/order-product-type'
import { OpenCloseButton } from '../../tools/button/open-close/open-close-button-component'
import { ContractType } from '../../../DATASTORE/data-types/main.data.types/contract-data-types'
import { ADD_PRODUCT_TO_ORDER } from '../../../DATASTORE/manage-contract/product/add-product'
import { OtherActionContexts } from '../../../utility/contexts/action.context'
import { useContext } from 'react'
import { SummaryCustomerOrdersAmountType } from '../../../DATASTORE/data-types/main.data.types/customer-data-types'
import { ContactsType } from '../../../DATASTORE/data-types/data-types'

type OrderedProductsType = {
  ordered_product: OrderedProducts
  order_id: string
  contract: ContractType
  children: JSX.Element
  handler: (products_id: string, order_id: string, contract: ContractType) => void
}
export const OrderedProductsComponent = ({ ordered_product, order_id, contract, children, handler }: OrderedProductsType): JSX.Element => {
  const { products_id } = ordered_product
  const handle_OpenRecord_Product = () => handler(products_id, order_id, contract)

  return (
    <div className='ordered-products-container'>
      <div className='ordered-products_menu'>
        <h4>Products</h4>
        <OpenCloseButton color={`green`} pageTextValue={'add product'} handler={handle_OpenRecord_Product} />
      </div>
      <div className='products-container'>{children}</div>
    </div>
  )
}
