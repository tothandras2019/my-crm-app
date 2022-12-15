import { Fragment } from 'react'
import { ProductType } from '../../../../DATASTORE/data-types/data-types'
import { formatter } from '../../../../utility/utility'
import './products-mapping-component.css'
export const ProductsMapping = ({ products }: { products: ProductType[] }) => {
  return (
    <Fragment>
      {products.map(({ name, quantity, price }, i) => (
        <p key={i} style={{ fontSize: '13px' }} className='product-items'>
          <strong>{name}</strong>
          <br />
          qty: {quantity} - price: {formatter.format(price)}
        </p>
      ))}
    </Fragment>
  )
}
