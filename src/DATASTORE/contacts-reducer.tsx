import { createContext, Dispatch, SetStateAction, useReducer } from 'react'
import { InitCustomers } from './data/contract-data'

//REDUCER
export type CustomersArrayType = typeof InitCustomers[]
export const InitCustomersArray: CustomersArrayType = [InitCustomers]

enum ACTION_TYPE {
  ADDCUSTOMER = 'ADD/CUSTOMER',
  MODIFY = 'MODIFY',
  DELETE = 'DELETE',
}

type ActionType = {
  type: string
  payload: typeof InitCustomers
}

const ContactReducer = (state = InitCustomersArray, action: ActionType) => {
  const { type, payload } = action

  switch (type) {
    case 'ADD/CUSTOMER': {
      const newCustomer = payload
      const lastElementIndex = state.length - 1
      newCustomer.id = state[lastElementIndex].id + 1

      return [...state, newCustomer]
    }
    case 'MODIFY': {
      const removedCustomer = state.filter((customer) => customer.id !== payload.id)
      return [...removedCustomer, payload]
    }
    case 'DELETE': {
      const removedCustomer = state.filter((customer) => customer.id !== payload.id)
      return removedCustomer
    }
    default: {
      return state
    }
  }
}

type DispatchType = Dispatch<ActionType>

export const CustomerContext = createContext<{ customer: typeof InitCustomers[]; dispatch: DispatchType }>({
  customer: InitCustomersArray,
  dispatch: ({ type, payload }) => InitCustomers,
})

export const CustomerContextProvider = ({ children }: { children: any }): JSX.Element => {
  const [customer, dispatch] = useReducer(ContactReducer, InitCustomersArray)

  return <CustomerContext.Provider value={{ customer, dispatch }}>{children}</CustomerContext.Provider>
}
