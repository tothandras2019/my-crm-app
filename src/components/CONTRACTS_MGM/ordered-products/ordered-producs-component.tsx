import './ordered-producs-component.css'
import { OrderedProducts } from '../../../DATASTORE/data-types/main.data.types/order-product-type'

type OrderedProductsType = { order: OrderedProducts; children: JSX.Element }
export const OrderedProductsComponent = ({ order, children }: OrderedProductsType): JSX.Element => {
  const { id, products } = order
  return (
    <div className='ordered-products-container'>
      <p>{id}</p>
      <div className='products-container'>{children}</div>
    </div>
  )
}
