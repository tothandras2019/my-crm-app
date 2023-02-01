import { MainContext } from './main.context'
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'
import { CustomerDataType, SummaryCustomerOrdersAmountType } from '../../DATASTORE/data-types/main.data.types/customer-data-types'
import { InputFieldSetForm } from '../../components/forms/product-form-inputs/product-form-inputs-component'
import { ServiceProductType, TempProduct } from '../../DATASTORE/data-types/main.data.types/product-data-types'
//#region InitManagerMenuOptions
type SetInitManagerMenuOptionDispatchType = Dispatch<SetStateAction<InitInit_Open_Manager_Type>>
type InitInit_Open_Manager_Type = {
  contacts: boolean
  // customerForModify: { customer: CustomerDataType | null }
  dashboard: boolean
  calendar: boolean
  settings: boolean
}
export const Init_Open_Manager: InitInit_Open_Manager_Type = {
  contacts: false,
  // customerForModify: { customer: null },
  dashboard: false,
  calendar: false,
  settings: false,
}
//#endregion
//#region ShowOrdersDetails
type SetShowOrdersDispatchType = Dispatch<SetStateAction<ShowOrdersDetailsType>>
export type ShowOrdersDetailsType = {
  indexs: boolean[]
}
export const ShowOrdersDetails: ShowOrdersDetailsType = {
  indexs: [],
}
//#endregion
//#region SelectedCustomer
type SetSelectedCustomerDispatchType = Dispatch<SetStateAction<SelectedCustomerType>>
export type SelectedCustomerType = {
  customer: SummaryCustomerOrdersAmountType | undefined
  order_id: string
  products_id: string | undefined
}
export const InitSelectedCustomer: SelectedCustomerType = {
  customer: undefined,
  order_id: '',
  products_id: undefined,
}
//#endregion
//#region PathAction
type SetPathDispatchType = Dispatch<SetStateAction<SetPathType>>
type SetPathType = { [key: string]: string }
export const PathAction: SetPathType = {
  currentPath: '',
}
//#endregion

//#region INPUTFIELD

type SetInputFieldType = Dispatch<SetStateAction<InputFieldType>>
type InputFieldType = { inputFields: { id: number; data: ServiceProductType | typeof TempProduct } }
export const InputField: InputFieldType = { inputFields: { id: 0, data: TempProduct } }

//#endregion

//#region MAIN CONTEXT
type ContextType = {
  path: SetPathType
  setPath: SetPathDispatchType
  open_Manager: InitInit_Open_Manager_Type
  SetOpen_Manager: SetInitManagerMenuOptionDispatchType
  showOrders: ShowOrdersDetailsType
  SetShowOrders: SetShowOrdersDispatchType
  selectedCustomerData: SelectedCustomerType
  SetSelectedCustomerType: SetSelectedCustomerDispatchType
  inputFieldsFormContainer: InputFieldType
  SetInputFieldsFormContainer: SetInputFieldType
}
export const OtherActionContexts = createContext<ContextType>({
  path: PathAction,
  setPath: () => {},
  open_Manager: Init_Open_Manager,
  SetOpen_Manager: () => {},
  showOrders: ShowOrdersDetails,
  SetShowOrders: () => {},
  selectedCustomerData: InitSelectedCustomer,
  SetSelectedCustomerType: () => {},
  inputFieldsFormContainer: InputField,
  SetInputFieldsFormContainer: () => {},
})
//#endregion

//#region PROVIDER
export const PathContextProvider = ({ children }: { children: any }) => {
  const [path, setPath] = useState(PathAction)
  const [open_Manager, SetOpen_Manager] = useState<InitInit_Open_Manager_Type>(Init_Open_Manager)
  const [showOrders, SetShowOrders] = useState<ShowOrdersDetailsType>(ShowOrdersDetails)
  const [selectedCustomerData, SetSelectedCustomerType] = useState<SelectedCustomerType>(InitSelectedCustomer)
  const [inputFieldsFormContainer, SetInputFieldsFormContainer] = useState<InputFieldType>(InputField)

  return (
    <OtherActionContexts.Provider
      value={{
        path,
        setPath,
        open_Manager,
        SetOpen_Manager,
        showOrders,
        SetShowOrders,
        selectedCustomerData,
        SetSelectedCustomerType,
        inputFieldsFormContainer,
        SetInputFieldsFormContainer,
      }}
    >
      {children}
    </OtherActionContexts.Provider>
  )
}
//#endregion
