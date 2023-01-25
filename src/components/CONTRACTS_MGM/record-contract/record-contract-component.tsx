import './record-contract-component.css'

import { FormEvent, useContext, useEffect, useState } from 'react'
import { ServiceCategory, ServiceProductType, TempProduct, Unit } from '../../../DATASTORE/data-types/main.data.types/product-data-types'
import { InitSelectedCustomer, OtherActionContexts, SelectedCustomerType } from '../../../utility/contexts/action.context'
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
import { ADD_PRODUCT_TO_ORDER, UPDATE_PRODUCT_ON_ORDER } from '../../../DATASTORE/manage-contract/product/add-product'
import { modifyContract } from '../../../DATASTORE/data-types/man.data.reducers/contracts-reducer/contracts.data.actions'

export const RecordOrders = (): JSX.Element => {
  const { selectedCustomerData, SetSelectedCustomerType, inputFieldsFormContainer, SetInputFieldsFormContainer } = useContext(OtherActionContexts)

  const { contracts } = useContext(MainContext)
  const { contractDataState, ContractsDataDispatch } = contracts

  const handleCancel = () => {
    SetInputFieldsFormContainer((state) => ({ ...state, inputFields: { ...state.inputFields, data: TempProduct } }))
    SetSelectedCustomerType(InitSelectedCustomer)
  }
  const handleAdd_Product = (fieldIndex: number, product: ServiceProductType) => {
    console.log('[handleAdd_Product]:', selectedCustomerData)

    const { prodID, orderID, contracData } = getContratData(selectedCustomerData)

    if (!contracData) return
    const modifiedContract = ADD_PRODUCT_TO_ORDER(orderID, contracData, product)
    ContractsDataDispatch(modifyContract(modifiedContract))
  }

  const handleUpdate_Product = (product: ServiceProductType) => {
    console.log('[handleUpdate_Product]:', selectedCustomerData)

    const { prodID, orderID, contracData } = getContratData(selectedCustomerData)

    if (!contracData) return
    const modifiedContract = UPDATE_PRODUCT_ON_ORDER(orderID, contracData, product)
    // ContractsDataDispatch(modifyContract(modifiedContract))
  }

  const getContratData = (selectedCustomerData: SelectedCustomerType) => {
    const contracData = selectedCustomerData.customer?.contract
    const orderID = selectedCustomerData.order_id as string
    const prodID = selectedCustomerData.products_id as string
    return { prodID, orderID, contracData }
  }

  useEffect(() => {
    console.log(inputFieldsFormContainer)
  }, [inputFieldsFormContainer])

  return (
    <ManageDataFrame>
      <div className='form-container'>
        <form>
          {
            <InputFieldSetForm
              key={`prod_${inputFieldsFormContainer.inputFields.id}`}
              isModification={false}
              title={'product'}
              fieldIndex={inputFieldsFormContainer.inputFields.id}
              data={inputFieldsFormContainer.inputFields.data}
              addProductHandler={handleAdd_Product}
              cancelHandler={handleCancel}
            />
          }
        </form>
      </div>
    </ManageDataFrame>
  )
}
