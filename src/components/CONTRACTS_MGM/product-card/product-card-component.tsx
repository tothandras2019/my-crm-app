import './product-card-component.css'

import { ServiceProductType } from '../../../DATASTORE/data-types/main.data.types/product-data-types'
import { formatter } from '../../../utility/number.formatter'
import { OpenCloseButton } from '../../tools/button/open-close/open-close-button-component'

type ProductCard = { product: ServiceProductType }

export const ProductCard = ({ product }: ProductCard): JSX.Element => {
  const { category, id, ordered_qty, unitPrice, unit_dimension, currency, other_information } = product

  return (
    <div className='product-entries-container'>
      <div>
        <p>
          category: {category} - item no.: {id}
        </p>
      </div>
      <p>{other_information}</p>
      <div>
        <p>{`${ordered_qty} x ${unitPrice}`} = </p>
        <p> {`${formatter.format(ordered_qty * unitPrice)}`}</p>
      </div>
      <div>
        <OpenCloseButton color={`yellow`} pageTextValue={'modify'} handler={() => {}} />
        <OpenCloseButton color={`red`} pageTextValue={'delete'} handler={() => {}} />
      </div>
    </div>
  )
}
