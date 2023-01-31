import './product-form-inputs-component.css'

import { Fragment, useEffect, useState } from 'react'
import { ServiceCategory, ServiceProductType, TempProduct, Unit } from '../../../DATASTORE/data-types/main.data.types/product-data-types'
import { OpenCloseButton } from '../../tools/button/open-close/open-close-button-component'
import { PlusButton } from '../../tools/button/plus-button/plus-button.component'
import { CustomButton } from '../../tools/button/submit/custom-button-component'
import { Input } from '../../tools/input/input-component'
import { ID_GENERATOR_ORDER } from '../../../DATASTORE/side-functions/id-generator'
import { SelectElement } from '../../tools/select-element/select-element-component'
type InputFieldSetFormType = {
  isModification: boolean
  fieldIndex: number
  title: string
  data: ServiceProductType | typeof TempProduct | undefined
  addProductHandler: (fieldIndex: number, prod: ServiceProductType) => void
  updateProductHandler: (product: ServiceProductType) => void
  cancelHandler: () => void
}
export const InputFieldSetForm = ({
  isModification,
  fieldIndex,
  title = 'n/a',
  data,
  addProductHandler,
  updateProductHandler,
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
    const product_id = ID_GENERATOR_ORDER({ type: 'prd' })
    SetStartData((state) => ({ ...state, id: product_id }))
    SetDoAddProduct(true)
  }

  const handleModify = () => SetDoAddProduct(true)

  const handle_Cancel = () => {
    SetDoAddProduct(false)
    cancelHandler()
  }

  useEffect(() => {
    if (data?.id.toLocaleUpperCase().includes('PRD')) {
      SetButtonTextChange('Modify')

      const { id, category, unitPrice, currency, ordered_qty, unit_dimension, other_information } = data

      SetStartData({
        id: id,
        category: category,
        unitPrice: unitPrice as number,
        currency: currency,
        ordered_qty: ordered_qty as number,
        unit_dimension: unit_dimension,
        other_information: other_information,
      })
    }
  }, [data])

  useEffect(() => {
    if (!doAddProduct) return
    if (buttonTextChange === 'Add') {
      addProductHandler(fieldIndex, startData)
      return
    }
    updateProductHandler(startData)
  }, [startData, doAddProduct])

  return (
    <div className='fieldset-container'>
      <fieldset>
        <legend>{title}</legend>
        {data &&
          Object.entries(data).map(([key, value], index, array) => {
            let enumObject = null
            if (key === 'unit_dimension' || key === 'category') {
              if (key === 'unit_dimension') enumObject = { enum: Unit }
              if (key === 'category') enumObject = { enum: ServiceCategory }
            }

            return (
              <Fragment key={`${key}_${value}`}>
                {enumObject ? (
                  <Fragment>
                    {'DISTANCE_KM' in enumObject.enum && (
                      <SelectElement
                        inputKey={key.toString()}
                        value={value.toString()}
                        optionEnum={Object(enumObject.enum)}
                        handler={handleProductChange}
                      />
                    )}
                    {'WAREHOUSING' in enumObject.enum && (
                      <SelectElement
                        inputKey={key.toString()}
                        value={value.toString()}
                        optionEnum={Object(enumObject.enum)}
                        handler={handleProductChange}
                      />
                    )}
                  </Fragment>
                ) : (
                  <>
                    {key !== 'id' && (
                      <Input key={`${key}_${value}`} type='text' defaultValue={value.toString()} label={key} handler={handleProductChange} />
                    )}
                  </>
                )}
              </Fragment>
            )
          })}
        <div className='product__button-actions'>
          <CustomButton
            color={buttonTextChange === 'Modify' ? 'yellow' : 'green'}
            value={buttonTextChange}
            type={'button'}
            handler={buttonTextChange === 'Modify' ? handleModify : handleAdd}
          />
          <OpenCloseButton color={'yellow'} pageTextValue={'cancel'} handler={handle_Cancel} />
        </div>
      </fieldset>
    </div>
  )
}
