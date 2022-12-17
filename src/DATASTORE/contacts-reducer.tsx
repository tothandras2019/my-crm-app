import { createContext, Dispatch, SetStateAction, useReducer, useState } from 'react'
import { InitCustomers } from './data/contract-data'
import CONTRACTS from './../DATASTORE/data/contracts.json'
import { InitCustomersType } from './data-types/data-types'

//REDUCER
export type CustomersArrayType = typeof InitCustomers[]
const CustomersArray: CustomersArrayType = [...CONTRACTS]

enum ACTION_TYPE {
  ADDCUSTOMER = 'ADD/CUSTOMER',
  MODIFY = 'MODIFY',
  DELETE = 'DELETE',
}

type ActionType = {
  type: string
  payload: typeof InitCustomers
}

const ContactReducer = (state = CustomersArray, action: ActionType) => {
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

export const CustomerContext = createContext<{
  customers: InitCustomersType[]
  dispatch: DispatchType
  active: InitCustomersType | null
  setActive: Dispatch<InitCustomersType | null>
  percent: number
  setPercent: Dispatch<SetStateAction<number>>
}>({
  customers: CustomersArray,
  dispatch: ({ type, payload }) => InitCustomers,
  active: InitCustomers,
  setActive: () => InitCustomers,
  percent: 0,
  setPercent: () => 0,
})

// export const ActiveContext = createContext<{ customer: InitCustomersType | null }>({ customer: null })
export const CustomerContextProvider = ({ children }: { children: any }): JSX.Element => {
  const [customers, dispatch] = useReducer(ContactReducer, CustomersArray)
  const [active, setActive] = useState<InitCustomersType | null>(null)
  const [percent, setPercent] = useState<number>(0)

  return <CustomerContext.Provider value={{ customers, dispatch, active, setActive, percent, setPercent }}>{children}</CustomerContext.Provider>
}
