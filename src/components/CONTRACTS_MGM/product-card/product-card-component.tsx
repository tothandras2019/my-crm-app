import './product-card-component.css'

import { ServiceProductType } from '../../../DATASTORE/data-types/main.data.types/product-data-types'

type ProductCard = { product: ServiceProductType }

export const ProductCard = ({ product }: ProductCard): JSX.Element => {
  const { category, id, ordered_qty, unitPrice, unit_dimension, currency, other_information } = product

  return (
    <div className='product-entries-container'>
      <p>
        {category}:{id}
      </p>
      <p>{other_information}</p>
      <p>{`${ordered_qty}x${unitPrice},-${currency}`}</p>
    </div>
  )
}
