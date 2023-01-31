import { ServiceProductType } from '../../main.data.types/product-data-types'
import { Dispatch } from 'react'
import { CONTRACTS_ACTION_TYPE } from './contracts.data.action.types'
import { CustomerDataType } from '../../main.data.types/customer-data-types'
import { ContractType } from '../../main.data.types/contract-data-types'
import { addContractToFirestore, updateContract_Firestore } from '../../../../utility/google-cloud-store/google-cloud-store'
export type ContractDispatchType = { type: string; payload: ContractType | ContractType[] | string }
export const ContractsDataReducer = (state: ContractType[] | [], action: ContractDispatchType) => {
  const { type, payload } = action

  switch (type) {
    case CONTRACTS_ACTION_TYPE.FILL_DATA: {
      const contracts = payload as ContractType[]

      // addContract_Firestore(custmoersArray)

      return contracts
    }
    case CONTRACTS_ACTION_TYPE.ADD_CONTRACTS: {
      const contract = payload as ContractType
      console.log(contract)
      addContractToFirestore(contract)
      return [...state, contract]
    }
    case CONTRACTS_ACTION_TYPE.MODIFY_CONTRACT: {
      const updatedContract = payload as ContractType
      updateContract_Firestore(updatedContract)
      const filteredCustomerState = state.filter((product) => product.id !== updatedContract.id)
      return [...filteredCustomerState, updatedContract]
    }
    case CONTRACTS_ACTION_TYPE.DELETE_CONTRACT: {
      //deleteContract_Firebase(payload)
      return [...state.filter((product) => product.id !== payload)]
    }
    default: {
      return state as ContractType[]
    }
  }
}
