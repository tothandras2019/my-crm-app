import { Fragment } from 'react'
import { ProductType } from '../../../../DATASTORE/data-types/data-types'
import { formatter } from '../../../../utility/number.formatter'
import './products-mapping-component.css'
export const ProductsMapping = ({ products }: { products: ProductType[] }) => {
  return (
    <Fragment>
      {products.map(({ name, quantity, price }, i) => (
        <p key={i} style={{ fontSize: '13px' }} className='product-items'>
          <h4>{name}: </h4>
          <p>
            qty: {quantity} : price: {formatter.format(price)}
          </p>
        </p>
      ))}
    </Fragment>
  )
}
