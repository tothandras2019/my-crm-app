import { ProductType } from './../../main.data.types/product-data-types'
import { Dispatch } from 'react'
import { PRODUCT_ACTION_TYPE } from './product.data.action.types'
export type ProductDispatchType = { type: string; payload: ProductType | ProductType[] | number }
export const ProductDataReducer = (state: ProductType[] | [], action: ProductDispatchType) => {
  const { type, payload } = action

  switch (type) {
    case PRODUCT_ACTION_TYPE.FILL_DATA: {
      return [payload]
    }
    case PRODUCT_ACTION_TYPE.ADD_PRODUCT: {
      return [...state, payload]
    }
    case PRODUCT_ACTION_TYPE.MODIFY_PRODUCT: {
      const newModifiedProduct = payload as ProductType
      const filteredProductsState = state.filter((product) => product.id !== newModifiedProduct.id)
      const newState = { ...filteredProductsState, newModifiedProduct }

      return [...newState]
    }
    case PRODUCT_ACTION_TYPE.DELETE_PRODUCT: {
      return [...state.filter((product) => product.id !== payload)]
    }
    default: {
      return state
    }
  }
}
