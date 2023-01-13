import { MainContext } from './main.context'
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'
import { CustomerDataType, SummaryCustomerOrdersAmountType } from '../../DATASTORE/data-types/main.data.types/customer-data-types'
//#region InitManagerMenuOptions
type SetInitManagerMenuOptionDispatchType = Dispatch<SetStateAction<InitManagerMenuOptionsType>>
type InitManagerMenuOptionsType = {
  contacts: boolean
  // customerForModify: { customer: CustomerDataType | null }
  dashboard: boolean
  calendar: boolean
  settings: boolean
}
export const InitManagerMenuOptions: InitManagerMenuOptionsType = {
  contacts: false,
  // customerForModify: { customer: null },
  dashboard: false,
  calendar: false,
  settings: false,
}
//#endregion
//#region ShowOrdersDetails
type SetShowOrdersDispatchType = Dispatch<SetStateAction<ShowOrdersDetailsType>>
type ShowOrdersDetailsType = {
  indexs: boolean[]
}
export const ShowOrdersDetails: ShowOrdersDetailsType = {
  indexs: [],
}
//#endregion
//#region SelectedCustomer
type SetSelectedCustomerDispatchType = Dispatch<SetStateAction<SelectedCustomerType>>
type SelectedCustomerType = {
  customer: SummaryCustomerOrdersAmountType | undefined
}
export const SelectedCustomer: SelectedCustomerType = {
  customer: undefined,
}
//#endregion
//#region PathAction
type SetPathDispatchType = Dispatch<SetStateAction<SetPathType>>
type SetPathType = { [key: string]: string }
export const PathAction: SetPathType = {
  currentPath: '',
}
//#endregion

//#region MAIN CONTEXT
type ContextType = {
  path: SetPathType
  setPath: SetPathDispatchType
  MenuManagerOpenOption: InitManagerMenuOptionsType
  SetMenuManagerOpenOption: SetInitManagerMenuOptionDispatchType
  showOrders: ShowOrdersDetailsType
  SetShowOrders: SetShowOrdersDispatchType
  selectedCustomerData: SelectedCustomerType
  SetSelectedCustomerType: SetSelectedCustomerDispatchType
}
export const OtherActionContexts = createContext<ContextType>({
  path: PathAction,
  setPath: () => {},
  MenuManagerOpenOption: InitManagerMenuOptions,
  SetMenuManagerOpenOption: () => {},
  showOrders: ShowOrdersDetails,
  SetShowOrders: () => {},
  selectedCustomerData: SelectedCustomer,
  SetSelectedCustomerType: () => {},
})
//#endregion

//#region PROVIDER
export const PathContextProvider = ({ children }: { children: any }) => {
  const [path, setPath] = useState(PathAction)
  const [menuManagerOpenOption, SetMenuManagerOpenOption] = useState<InitManagerMenuOptionsType>(InitManagerMenuOptions)
  const [showOrders, SetShowOrders] = useState<ShowOrdersDetailsType>(ShowOrdersDetails)
  const [selectedCustomerData, SetSelectedCustomerType] = useState<SelectedCustomerType>(SelectedCustomer)

  return (
    <OtherActionContexts.Provider
      value={{
        path,
        setPath,
        MenuManagerOpenOption: menuManagerOpenOption,
        SetMenuManagerOpenOption,
        showOrders,
        SetShowOrders,
        selectedCustomerData,
        SetSelectedCustomerType,
      }}
    >
      {children}
    </OtherActionContexts.Provider>
  )
}
//#endregion
