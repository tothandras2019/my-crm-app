import { CustomerDataType } from '../../main.data.types/customer-data-types'
import { ServiceProductType } from '../../main.data.types/product-data-types'
import { CUSTOMER_ACTION_TYPE } from './customer.data.action.types'
import { CustomerDispatchType } from './customer.data.reducer'
export const addProduct = (product: CustomerDataType): CustomerDispatchType => ({ type: CUSTOMER_ACTION_TYPE.ADD_CUSTOMER, payload: product })
export const fillUpProduct = (products: CustomerDataType[]): CustomerDispatchType => ({ type: CUSTOMER_ACTION_TYPE.FILL_DATA, payload: products })
export const deleteProduct = (product_id: number): CustomerDispatchType => ({ type: CUSTOMER_ACTION_TYPE.DELETE_CUSTOMER, payload: product_id })
export const modifyProduct = (product: CustomerDataType): CustomerDispatchType => ({ type: CUSTOMER_ACTION_TYPE.MODIFY_CUSTOMER, payload: product })
