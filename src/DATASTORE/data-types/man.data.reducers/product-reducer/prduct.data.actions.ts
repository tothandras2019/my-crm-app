import { ProductType } from '../../main.data.types/product-data-types'
import { PRODUCT_ACTION_TYPE } from './product.data.action.types'
import { ProductDispatchType } from './product.data.reducer'
export const addProduct = (product: ProductType): ProductDispatchType => ({ type: PRODUCT_ACTION_TYPE.ADD_PRODUCT, payload: product })
export const fillUpProduct = (products: ProductType[]): ProductDispatchType => ({ type: PRODUCT_ACTION_TYPE.FILL_DATA, payload: products })
export const deleteProduct = (product_id: number): ProductDispatchType => ({ type: PRODUCT_ACTION_TYPE.DELETE_PRODUCT, payload: product_id })
export const modifyProduct = (product: ProductType): ProductDispatchType => ({ type: PRODUCT_ACTION_TYPE.MODIFY_PRODUCT, payload: product })
