import { ContractType } from '../../main.data.types/contract-data-types'
import { CustomerDataType } from '../../main.data.types/customer-data-types'
import { ServiceProductType } from '../../main.data.types/product-data-types'
import { CONTRACTS_ACTION_TYPE } from './contracts.data.action.types'
import { ContractDispatchType } from './contracts.data.reducer'
export const addContract = (contract: ContractType): ContractDispatchType => ({ type: CONTRACTS_ACTION_TYPE.ADD_CONTRACTS, payload: contract })
export const fillUpContracts = (customers: ContractType[]): ContractDispatchType => ({
  type: CONTRACTS_ACTION_TYPE.FILL_DATA,
  payload: customers,
})
export const deleteContract = (contract_id: string): ContractDispatchType => ({ type: CONTRACTS_ACTION_TYPE.DELETE_CONTRACT, payload: contract_id })
export const modifyContract = (contract: ContractType): ContractDispatchType => ({ type: CONTRACTS_ACTION_TYPE.MODIFY_CONTRACT, payload: contract })
