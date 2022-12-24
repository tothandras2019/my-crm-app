import { createContext, Dispatch, useReducer } from 'react'
import { ProductsName, ProductType } from '../../DATASTORE/data-types/data-types'
import { UserDataActionTypes, UserDataReducer } from '../../DATASTORE/login-reducer'
import { UserInitArray, UserType } from './../../DATASTORE/data-types/user-data-types'
import { InitaialAvailableProducts, ProductsReducer, ProductActionType } from '../../DATASTORE/products-reducer'
import { ContactReducer, CustomerActionType, CustomersArrayType } from '../../DATASTORE/contacts-reducer'
import { CustomerDispatchType, CustomersDataReducer } from '../../DATASTORE/data-types/man.data.reducers/customer-reducer/customer.data.reducer'

export const MainContext = createContext<{
  customerReducer: { customerState: CustomersArrayType; CustomerDispatch: Dispatch<CustomerDispatchType> }
  productReducer: { productState: ProductType[] | [] | undefined; ProductDispatch: Dispatch<ProductActionType> }
  userDataReducer: { userDataState: UserType[] | [] | undefined; UserDataDispatch: Dispatch<UserDataActionTypes> }
}>({
  customerReducer: { customerState: [], CustomerDispatch: () => {} },
  productReducer: { productState: [], ProductDispatch: () => {} },
  userDataReducer: { userDataState: [], UserDataDispatch: () => {} },
})

export const MainContextProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [productState, ProductDispatch] = useReducer(ProductsReducer, [])
  const [userDataState, UserDataDispatch] = useReducer(UserDataReducer, [])
  const [customerState, CustomerDispatch] = useReducer(CustomersDataReducer, [])
  return (
    <MainContext.Provider
      value={{
        customerReducer: { customerState, CustomerDispatch },
        productReducer: { productState, ProductDispatch },
        userDataReducer: { userDataState, UserDataDispatch },
      }}
    >
      {children}
    </MainContext.Provider>
  )
}
