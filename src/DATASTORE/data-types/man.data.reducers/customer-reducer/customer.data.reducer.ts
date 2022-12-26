import { ServiceProductType } from '../../main.data.types/product-data-types'
import { Dispatch } from 'react'
import { CUSTOMER_ACTION_TYPE } from './customer.data.action.types'
import { CustomerDataType } from '../../main.data.types/customer-data-types'
export type CustomerDispatchType = { type: string; payload: CustomerDataType | CustomerDataType[] | number }
export const CustomersDataReducer = (state: CustomerDataType[] | [], action: CustomerDispatchType) => {
  const { type, payload } = action

  switch (type) {
    case CUSTOMER_ACTION_TYPE.FILL_DATA: {
      return [payload]
    }
    case CUSTOMER_ACTION_TYPE.ADD_CUSTOMER: {
      return [...state, payload]
    }
    case CUSTOMER_ACTION_TYPE.MODIFY_CUSTOMER: {
      const newModifiedCustomer = payload as CustomerDataType
      const filteredCustomerState = state.filter((product) => product.id !== newModifiedCustomer.id)
      const newState = { ...filteredCustomerState, newModifiedCustomer }

      return [...newState]
    }
    case CUSTOMER_ACTION_TYPE.DELETE_CUSTOMER: {
      return [...state.filter((product) => product.id !== payload)]
    }
    default: {
      return state
    }
  }
}
