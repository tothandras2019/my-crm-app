import { createContext, Dispatch, SetStateAction, useReducer } from 'react'

export type InitCustomersType = {
  id: number
  name: string
  email: string
  address: {
    country: string
    city: string
    building: number
    street: string
    zip: number
  }
  salesStatus: string
  opportunityAmount: number
}
export const InitCustomers: InitCustomersType = {
  id: 0,
  name: 'Chep',
  email: 'Chep@chep.com',
  address: {
    country: 'Australia',
    city: 'Perth',
    building: 34,
    street: 'Snake of black',
    zip: 143234,
  },
  salesStatus: 'new',
  opportunityAmount: 23425,
}
export type CustomersArrayType = typeof InitCustomers[]
export const InitCustomersArray: CustomersArrayType = [InitCustomers]

enum ACTION_TYPE {
  ADD = 'ADD',
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
    case 'ADD': {
      const newCustomer = payload
      const lastElementIndex = state.length - 1
      newCustomer.id = state[lastElementIndex].id + 1

      return [...state, newCustomer]
    }
    case 'MODIFY': {
      return state
    }
    case 'DELETE': {
      return state
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
