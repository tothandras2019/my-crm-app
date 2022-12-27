import { ServiceProductType } from '../../main.data.types/product-data-types'
import { Dispatch } from 'react'
import { CONTRACTS_ACTION_TYPE } from './contracts.data.action.types'
import { CustomerDataType } from '../../main.data.types/customer-data-types'
import { ContractType } from '../../main.data.types/contract-data-types'
export type ContractDispatchType = { type: string; payload: ContractType | ContractType[] | string }
export const ContractsDataReducer = (state: ContractType[] | [], action: ContractDispatchType) => {
  const { type, payload } = action

  switch (type) {
    case CONTRACTS_ACTION_TYPE.FILL_DATA: {
      const custmoersArray = payload as ContractType[]
      return custmoersArray
    }
    case CONTRACTS_ACTION_TYPE.ADD_CONTRACTS: {
      return [...state, payload]
    }
    case CONTRACTS_ACTION_TYPE.MODIFY_CONTRACT: {
      const newModifiedCustomer = payload as ContractType
      const filteredCustomerState = state.filter((product) => product.id !== newModifiedCustomer.id)
      const newState = { ...filteredCustomerState, newModifiedCustomer }

      return [...newState]
    }
    case CONTRACTS_ACTION_TYPE.DELETE_CONTRACT: {
      return [...state.filter((product) => product.id !== payload)]
    }
    default: {
      return state
    }
  }
}
