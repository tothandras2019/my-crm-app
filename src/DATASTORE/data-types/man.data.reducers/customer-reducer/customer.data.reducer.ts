import { ServiceProductType } from '../../main.data.types/product-data-types'
import { Dispatch } from 'react'
import { CUSTOMER_ACTION_TYPE } from './customer.data.action.types'
import { CustomerDataType } from '../../main.data.types/customer-data-types'
import { addCustomerToFirestore, deleteCustomerFirestore, updateCustomerFirestore } from '../../../../utility/google-cloud-store/google-cloud-store'
export type CustomerActionType = { type: string; payload: CustomerDataType | CustomerDataType[] | string }
export const CustomersDataReducer = (state: CustomerDataType[], action: CustomerActionType) => {
  const { type, payload } = action

  switch (type) {
    case CUSTOMER_ACTION_TYPE.FILL_DATA: {
      const customersArray = payload as CustomerDataType[]
      return customersArray
    }
    case CUSTOMER_ACTION_TYPE.ADD_CUSTOMER: {
      const CustomerPayload = payload as CustomerDataType

      addCustomerToFirestore(CustomerPayload)
      return [...state, CustomerPayload]
    }
    case CUSTOMER_ACTION_TYPE.MODIFY_CUSTOMER: {
      console.log(payload)
      const newModifiedCustomer = payload as CustomerDataType
      const filteredCustomerState: CustomerDataType[] | [] = state.filter((product) => product.id !== newModifiedCustomer.id)
      // updateCustomerFirestore(newModifiedCustomer)
      return [...filteredCustomerState, newModifiedCustomer]
    }
    case CUSTOMER_ACTION_TYPE.DELETE_CUSTOMER: {
      const customerId = payload as string
      deleteCustomerFirestore(customerId)
      return [...state.filter((customer) => customer.id !== customerId)]
    }
    default: {
      return [...state]
    }
  }
}
