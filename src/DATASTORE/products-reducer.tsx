import { Dispatch, createContext, useReducer } from 'react'
import { ProductsName, GeneralType, ProductType } from './data-types/data-types'
import { ProductActions } from './products-reducer-actions-types'

export const InitaialAvailableProducts: ProductType[] = []

export type ProductActionType = {
  type: string
  payload: ProductType
}
export const ProductsReducer = (state = InitaialAvailableProducts, action: ProductActionType) => {
  const { type, payload } = action

  switch (type) {
    case ProductActions.ADD_PRODUCT: {
      return [...state, payload]
    }
    case ProductActions.MODIFY_PRODUCT: {
      const productToBeModified = state.find((product) => product.id === payload.id)
      if (!productToBeModified) return state

      const modifiedProduct = { ...payload, id: productToBeModified.id }
      const filetereState = state.filter((product) => product.id !== payload.id)
      return [...filetereState, modifiedProduct]
    }
    case ProductActions.DELETE_PRODUCT: {
      return []
    }
  }
}
