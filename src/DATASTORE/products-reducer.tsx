import { Dispatch, createContext, useReducer } from 'react'
import { ProductsName, GeneralType } from './data-types/data-types'

const Product: ProductsName = { name: 'transport' }
const InitaialAvailableProducts: ProductsName[] = [Product]

type ActionType = {
  type: string
  payload: ProductsName
}
const ProductsReducer = (state = InitaialAvailableProducts, action: ActionType) => {
  const { type, payload } = action

  switch (type) {
    case 'ADD/PRODUCT': {
      return [...state, payload]
    }

    case 'REMOVE/PRODUCT': {
      const filtered = state.filter((product) => product.name === payload.name)
      return []
    }
  }
}

type DispatchType = Dispatch<ActionType>

export const ProductContext = createContext<{ product: ProductsName[] | undefined; dispatch: DispatchType }>({
  product: InitaialAvailableProducts,
  dispatch: ({ type, payload }) => Product,
})

export const ProductContextProvider = ({ children }: { children: any }): JSX.Element => {
  const [product, dispatch] = useReducer(ProductsReducer, InitaialAvailableProducts)

  return <ProductContext.Provider value={{ product, dispatch }}>{children}</ProductContext.Provider>
}
