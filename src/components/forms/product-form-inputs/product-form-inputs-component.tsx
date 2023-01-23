import { useEffect, useState } from 'react'
import { ServiceCategory, ServiceProductType, TempProduct, Unit } from '../../../DATASTORE/data-types/main.data.types/product-data-types'
import { PlusButton } from '../../tools/button/plus-button/plus-button.component'
import { CustomButton } from '../../tools/button/submit/custom-button-component'
import { Input } from '../../tools/input/input-component'
type InputFieldSetFormType = {
  fieldIndex: number
  title: string
  data: ServiceProductType | typeof TempProduct | undefined
  handler: (e: number) => void
  changeHandler: (fieldIndex: number, prod: ServiceProductType) => void
}
export const InputFieldSetForm = ({ fieldIndex, title = 'n/a', data, handler = (e) => {}, changeHandler }: InputFieldSetFormType): JSX.Element => {
  const [buttonTextChange, SetButtonTextChange] = useState<'Add' | 'Modify'>('Add')

  const [startData, SetStartData] = useState<ServiceProductType>({
    id: 0,
    category: ServiceCategory.TRANSPORT,
    unitPrice: 0,
    currency: 'string',
    ordered_qty: 0,
    unit_dimension: Unit.DISTANCE_KM,
    other_information: 'string',
  })

  const handleProductChange = ({ returnLabel, value }: { returnLabel: string; value: string }) => {
    console.log('[label]:', returnLabel, '[value]:', value)
    SetStartData((state) => ({ ...state, [returnLabel]: value }))
  }
  useEffect(() => {
    console.log(data)
  }, [data])

  const handleAdd = () => {
    changeHandler(fieldIndex, startData)
    SetButtonTextChange('Modify')
  }

  return (
    <div>
      <fieldset>
        <legend>{title}</legend>
        {data &&
          Object.entries(data).map(([key, value], index, array) => (
            <Input key={`key__${fieldIndex}_${index}`} label={key} defaultValue={value.toString()} handler={handleProductChange} />
          ))}
        <div className='product__button-actions'>
          <PlusButton type='remove' handler={() => handler(fieldIndex)} />
          <CustomButton color={buttonTextChange === 'Modify' ? 'yellow' : 'green'} value={buttonTextChange} type={'button'} handler={handleAdd} />
        </div>
      </fieldset>
    </div>
  )
}
