import { CustomerDataType } from '../../main.data.types/customer-data-types'
import { ServiceProductType } from '../../main.data.types/product-data-types'
import { CUSTOMER_ACTION_TYPE } from './customer.data.action.types'
import { CustomerDispatchType } from './customer.data.reducer'
export const addCustomer = (product: CustomerDataType): CustomerDispatchType => ({ type: CUSTOMER_ACTION_TYPE.ADD_CUSTOMER, payload: product })
export const fillUpCustomer = (customers: CustomerDataType[]): CustomerDispatchType => ({ type: CUSTOMER_ACTION_TYPE.FILL_DATA, payload: customers })
export const deleteCustomer = (product_id: string): CustomerDispatchType => ({ type: CUSTOMER_ACTION_TYPE.DELETE_CUSTOMER, payload: product_id })
export const modifyCustomer = (product: CustomerDataType): CustomerDispatchType => ({ type: CUSTOMER_ACTION_TYPE.MODIFY_CUSTOMER, payload: product })
