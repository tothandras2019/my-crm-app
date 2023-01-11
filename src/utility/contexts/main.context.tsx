import { createContext, Dispatch, useReducer } from 'react'
import { ProductsName, ProductType } from '../../DATASTORE/data-types/data-types'
import { UserDataActionTypes, UserDataReducer } from '../../DATASTORE/login-reducer'
import { UserInitArray, UserType } from './../../DATASTORE/data-types/user-data-types'
import { InitaialAvailableProducts, ProductsReducer, ProductActionType } from '../../DATASTORE/products-reducer'
import { ContactReducer, CustomersArrayType } from '../../DATASTORE/contacts-reducer'
import { CustomerActionType, CustomersDataReducer } from '../../DATASTORE/data-types/man.data.reducers/customer-reducer/customer.data.reducer'
import { CustomerDataType } from '../../DATASTORE/data-types/main.data.types/customer-data-types'
import { ContractDispatchType, ContractsDataReducer } from '../../DATASTORE/data-types/man.data.reducers/contracts-reducer/contracts.data.reducer'
import { ContractType } from '../../DATASTORE/data-types/main.data.types/contract-data-types'
import { WarehouseingServiceType } from '../../DATASTORE/data-types/main.data.types/product-data-types'
import { WarehouseDataReducer, WarehouseDispatchType } from '../../DATASTORE/data-types/man.data.reducers/warehouse-reducer/warehouse.data.reducer'

export const MainContext = createContext<{
  // export const MainContext = createContext<{
  customers: { customerState: CustomerDataType[] | []; CustomerDispatch: Dispatch<CustomerActionType> }
  products: { productState: ProductType[] | [] | undefined; ProductDispatch: Dispatch<ProductActionType> }
  userAllData: { userDataState: UserType[] | []; UserDataDispatch: Dispatch<UserDataActionTypes> }
  contracts: { contractDataState: ContractType[] | []; ContractsDataDispatch: Dispatch<ContractDispatchType> }
  warehouse: { warehouseDataState: WarehouseingServiceType[] | []; WarehouseDataDispatch: Dispatch<WarehouseDispatchType> }
}>({
  customers: { customerState: [], CustomerDispatch: () => {} },
  products: { productState: [], ProductDispatch: () => {} },
  userAllData: { userDataState: [], UserDataDispatch: () => {} },
  contracts: { contractDataState: [], ContractsDataDispatch: () => {} },
  warehouse: { warehouseDataState: [], WarehouseDataDispatch: () => {} },
})

export const MainContextProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [productState, ProductDispatch] = useReducer(ProductsReducer, [])
  const [userDataState, UserDataDispatch] = useReducer(UserDataReducer, [])
  const [customerState, CustomerDispatch] = useReducer(CustomersDataReducer, [])
  const [contractDataState, ContractsDataDispatch] = useReducer(ContractsDataReducer, [])
  const [warehouseDataState, WarehouseDataDispatch] = useReducer(WarehouseDataReducer, [])

  return (
    <MainContext.Provider
      value={{
        customers: { customerState, CustomerDispatch },
        products: { productState, ProductDispatch },
        userAllData: { userDataState, UserDataDispatch },
        contracts: { contractDataState, ContractsDataDispatch },
        warehouse: { warehouseDataState, WarehouseDataDispatch },
      }}
    >
      {children}
    </MainContext.Provider>
  )
}
