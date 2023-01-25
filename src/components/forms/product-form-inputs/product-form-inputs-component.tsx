import './product-form-inputs-component.css'

import { useEffect, useState } from 'react'
import { ServiceCategory, ServiceProductType, TempProduct, Unit } from '../../../DATASTORE/data-types/main.data.types/product-data-types'
import { OpenCloseButton } from '../../tools/button/open-close/open-close-button-component'
import { PlusButton } from '../../tools/button/plus-button/plus-button.component'
import { CustomButton } from '../../tools/button/submit/custom-button-component'
import { Input } from '../../tools/input/input-component'
import { ID_GENERATOR } from '../../../DATASTORE/side-functions/id-generator'
type InputFieldSetFormType = {
  isModification: boolean
  fieldIndex: number
  title: string
  data: ServiceProductType | typeof TempProduct | undefined
  addProductHandler: (fieldIndex: number, prod: ServiceProductType) => void
  cancelHandler: () => void
}
export const InputFieldSetForm = ({
  isModification,
  fieldIndex,
  title = 'n/a',
  data,
  addProductHandler,
  cancelHandler,
}: InputFieldSetFormType): JSX.Element => {
  const [buttonTextChange, SetButtonTextChange] = useState<'Add' | 'Modify'>('Add')
  const [doAddProduct, SetDoAddProduct] = useState<boolean>(false)

  const [startData, SetStartData] = useState<ServiceProductType>({
    id: '0',
    category: ServiceCategory.TRANSPORT,
    unitPrice: 0,
    currency: '',
    ordered_qty: 0,
    unit_dimension: Unit.DISTANCE_KM,
    other_information: '',
  })

  const handleProductChange = ({ returnLabel, value }: { returnLabel: string; value: string }) =>
    SetStartData((state) => ({ ...state, [returnLabel]: value }))

  const handleAdd = () => {
    const product_id = ID_GENERATOR({ type: 'prd' })
    SetStartData((state) => ({ ...state, id: product_id }))
    SetDoAddProduct(true)
  }

  const handle_Cancel = () => {
    SetDoAddProduct(false)
    cancelHandler()
  }

  useEffect(() => {
    if (!doAddProduct) return
    addProductHandler(fieldIndex, startData)
    SetButtonTextChange(isModification ? 'Modify' : 'Add')
  }, [startData])

  return (
    <div className='fieldset-container'>
      <fieldset>
        <legend>{title}</legend>
        {data &&
          Object.entries(data).map(([key, value], index, array) => (
            <Input key={`key__${fieldIndex}_${index}`} label={key} defaultValue={value.toString()} handler={handleProductChange} />
          ))}
        <div className='product__button-actions'>
          <CustomButton color={buttonTextChange === 'Modify' ? 'yellow' : 'green'} value={buttonTextChange} type={'button'} handler={handleAdd} />
          <OpenCloseButton color={'yellow'} pageTextValue={'cancel'} handler={handle_Cancel} />
        </div>
      </fieldset>
    </div>
  )
}
