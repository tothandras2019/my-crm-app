import './record-contract-component.css'

import { FormEvent, useContext, useEffect, useState } from 'react'
import { ServiceCategory, ServiceProductType, TempProduct, Unit } from '../../../DATASTORE/data-types/main.data.types/product-data-types'
import { InitSelectedCustomer, OtherActionContexts } from '../../../utility/contexts/action.context'
import { ManageDataFrame } from '../../manage-data-frame/manage-data-frame-component'
import { OpenCloseButton } from '../../tools/button/open-close/open-close-button-component'
import { PlusButton } from '../../tools/button/plus-button/plus-button.component'
import { CustomButton } from '../../tools/button/submit/custom-button-component'
import { Input } from '../../tools/input/input-component'
import { InputFieldSetForm } from './../../forms/product-form-inputs/product-form-inputs-component'
import { MainContext } from '../../../utility/contexts/main.context'
import { ContractDispatchType } from '../../../DATASTORE/data-types/man.data.reducers/contracts-reducer/contracts.data.reducer'
import { ContractType } from '../../../DATASTORE/data-types/main.data.types/contract-data-types'
import { GetProductObject } from '../../../DATASTORE/data/get-product-object'

export const RecordOrders = (): JSX.Element => {
  const { selectedCustomerData, SetSelectedCustomerType } = useContext(OtherActionContexts)
  const [currentContract, SetCurrentContract] = useState<ContractType | null>(null)

  const { contracts } = useContext(MainContext)
  const { contractDataState, ContractsDataDispatch } = contracts

  // const [numProductContainers, SetNumProductContainers] = useState<string[]>([''])
  const [InputFieldsFormContainer, SetInputFieldsFormContainer] = useState<{
    inputFields: { id: number; FieldItem: typeof InputFieldSetForm; data: ServiceProductType | typeof TempProduct }[]
  }>({
    inputFields: [{ id: 0, FieldItem: InputFieldSetForm, data: TempProduct }],
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    const data = event.target as HTMLFormElement

    let inputValues: string[] = []
    let productObject = {}
    Object.entries(data).forEach(([key, val]) => {
      // console.log(val.name, val.value)
      if (!val.name) return
      productObject = { ...productObject, [val.name.split('-')[2]]: val.value }
      inputValues.push(val.value)
    })

    // console.log('[productObject]:', productObject)

    // console.log(currentContract)
    if (currentContract) {
      // SetCurrentContract((state) => ({
      //   ...state,
      //   orders: [...state.orders, { order_date: '2022.12.20', order_id: '2', ordered_products: [productObject] }],
      // }))
    }
    // console.log(selectedCustomerData)
    // console.log(contractDataState)
  }

  useEffect(() => {
    if (!selectedCustomerData?.customer?.contract.id) return
    const currendContractFrom_selectedCustomer = contractDataState.find((contract) => contract.id === selectedCustomerData.customer?.contract.id)
    if (currendContractFrom_selectedCustomer) SetCurrentContract(currendContractFrom_selectedCustomer)
  }, [selectedCustomerData.customer])

  const handleCancel = () => SetSelectedCustomerType(InitSelectedCustomer)
  // const handleAddProductFields = (): void => SetNumProductContainers((state) => [...state, ''])

  const handleAdd_InputValues = (fieldIndex: number, prod: ServiceProductType) => {
    //TODO: BUG: felcseréli a módosítás után az elemeket!
    let actualField = InputFieldsFormContainer.inputFields.find((field) => field.id === fieldIndex)
    const filteredInputFields = InputFieldsFormContainer.inputFields.filter((field) => field.id !== fieldIndex)

    if (!actualField) return
    const newField = { ...actualField, data: prod }
    filteredInputFields && SetInputFieldsFormContainer((state) => ({ inputFields: [...filteredInputFields, newField] }))
  }

  const handleAddProductInputField = (): void => {
    const latestField = InputFieldsFormContainer.inputFields.reduce(
      (latest, item) => (latest.id < item.id ? item : latest),
      InputFieldsFormContainer.inputFields[0],
    )

    SetInputFieldsFormContainer((state) => ({
      inputFields: [...state.inputFields, { id: latestField.id + 1, FieldItem: InputFieldSetForm, data: TempProduct }],
    }))
  }

  const handleRemoveProductFields = (fieldIndex: number): void => {
    if (InputFieldsFormContainer.inputFields.length > 1) {
      const removedInputfield = InputFieldsFormContainer.inputFields.filter(({ id, FieldItem }, index) => {
        return id !== fieldIndex
      })
      SetInputFieldsFormContainer((state) => ({ ...state, inputFields: removedInputfield }))
    }
  }

  useEffect(() => {
    console.log(InputFieldsFormContainer)
  }, [InputFieldsFormContainer])

  return (
    <ManageDataFrame>
      <div>
        <form onSubmit={handleSubmit}>
          {InputFieldsFormContainer.inputFields.map(({ id, FieldItem, data }, index) => (
            <FieldItem
              key={`prod_${id}_${index}`}
              title={'product'}
              fieldIndex={id}
              data={data}
              handler={handleRemoveProductFields}
              changeHandler={handleAdd_InputValues}
            />
          ))}
          <div className='record__orders-actions'>
            <PlusButton handler={handleAddProductInputField} />
            <CustomButton color={'green'} value={'submit order'} type={'submit'} />
            <OpenCloseButton color={'yellow'} pageTextValue={'cancel'} handler={handleCancel} />
          </div>
        </form>
      </div>
    </ManageDataFrame>
  )
}

// Type
//'[{ id: number; FieldItem: ({ fieldIndex, title, data, handler }: InputFieldSetFormType) => Element; }, { id: number; FieldItem: ({ fieldIndex, title, data, handler }: InputFieldSetFormType) => Element; }]' is not assignable to type
//'[{ id: number; FieldItem: ({ fieldIndex, title, data, handler }: InputFieldSetFormType) => Element; }]'.
//   Source has 2 element(s) but target allows only 1.ts(2345)
