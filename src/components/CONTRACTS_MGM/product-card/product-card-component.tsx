import './product-card-component.css'

import { ServiceProductType } from '../../../DATASTORE/data-types/main.data.types/product-data-types'
import { formatter } from '../../../utility/number.formatter'
import { OpenCloseButton } from '../../tools/button/open-close/open-close-button-component'
import { ContractType } from '../../../DATASTORE/data-types/main.data.types/contract-data-types'
import { OrderedProducts } from '../../../DATASTORE/data-types/main.data.types/order-product-type'
import { InputField, OtherActionContexts } from '../../../utility/contexts/action.context'
import { useContext, useEffect } from 'react'
import { DELETE_PRODUCT_ON_ORDER } from '../../../DATASTORE/manage-contract/product/delete-product'
import { modifyContract } from '../../../DATASTORE/data-types/man.data.reducers/contracts-reducer/contracts.data.actions'
import { MainContext } from '../../../utility/contexts/main.context'

type ProductCard = {
  order_id: string
  contract: ContractType
  product: ServiceProductType
  ordered_product: OrderedProducts
  handle_Modification: (products_id: string, order_id: string, contract: ContractType) => void
}

export const ProductCard = ({ order_id, contract, product, ordered_product, handle_Modification }: ProductCard): JSX.Element => {
  const { category, id, ordered_qty, unitPrice, unit_dimension, currency, other_information } = product
  const { products_id } = ordered_product

  const { SetInputFieldsFormContainer } = useContext(OtherActionContexts)
  const { contracts } = useContext(MainContext)
  const { ContractsDataDispatch } = contracts

  useEffect(() => {}, [product])

  const handleModify = () => {
    console.log(category, id, ordered_qty, unitPrice, unit_dimension, currency, other_information)
    console.log(product)
    SetInputFieldsFormContainer((state) => ({ ...state, inputFields: { ...state.inputFields, data: product } }))
    handle_Modification(products_id, order_id, contract)
  }

  const handleDelete = () => {
    ContractsDataDispatch(modifyContract(DELETE_PRODUCT_ON_ORDER(order_id, contract, product)))
  }

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
        <OpenCloseButton color={`yellow`} pageTextValue={'modify'} handler={handleModify} />
        <OpenCloseButton color={`red`} pageTextValue={'delete'} handler={handleDelete} />
      </div>
    </div>
  )
}
