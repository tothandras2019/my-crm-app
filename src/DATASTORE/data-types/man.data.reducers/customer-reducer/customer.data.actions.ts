import { CustomerDataType } from '../../main.data.types/customer-data-types'
import { ServiceProductType } from '../../main.data.types/product-data-types'
import { CUSTOMER_ACTION_TYPE } from './customer.data.action.types'
import { CustomerActionType } from './customer.data.reducer'
export const addCustomer = (customer: CustomerDataType): CustomerActionType => ({ type: CUSTOMER_ACTION_TYPE.ADD_CUSTOMER, payload: customer })
export const fillUpCustomer = (customers: CustomerDataType[]): CustomerActionType => ({ type: CUSTOMER_ACTION_TYPE.FILL_DATA, payload: customers })
export const deleteCustomer = (customer_id: string): CustomerActionType => ({ type: CUSTOMER_ACTION_TYPE.DELETE_CUSTOMER, payload: customer_id })
export const modifyCustomer = (customer: CustomerDataType): CustomerActionType => ({
  type: CUSTOMER_ACTION_TYPE.MODIFY_CUSTOMER,
  payload: customer,
})
