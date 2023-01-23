import './ordered-producs-component.css'
import { OrderedProducts } from '../../../DATASTORE/data-types/main.data.types/order-product-type'
import { OpenCloseButton } from '../../tools/button/open-close/open-close-button-component'

type OrderedProductsType = { order: OrderedProducts; children: JSX.Element }
export const OrderedProductsComponent = ({ order, children }: OrderedProductsType): JSX.Element => {
  const { id, products } = order
  return (
    <div className='ordered-products-container'>
      <div className='ordered-products_menu'>
        <h4>Products</h4>
        <OpenCloseButton color={`green`} pageTextValue={'add product'} handler={() => {}} />
      </div>
      <div className='products-container'>{children}</div>
    </div>
  )
}
