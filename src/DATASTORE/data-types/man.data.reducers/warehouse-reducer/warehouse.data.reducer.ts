import { ServiceProductType, WarehouseingServiceType } from '../../main.data.types/product-data-types'
import { Dispatch } from 'react'
import { WAREHOUSE_ACTION_TYPE } from './warehouse.data.action.types'
import { CustomerDataType } from '../../main.data.types/customer-data-types'
import { ContractType } from '../../main.data.types/contract-data-types'
export type WarehouseDispatchType = { type: string; payload: WarehouseingServiceType | WarehouseingServiceType[] | string }
export const WarehouseDataReducer = (state: ContractType[] | [], action: WarehouseDispatchType) => {
  const { type, payload } = action

  switch (type) {
    case WAREHOUSE_ACTION_TYPE.FILL_DATA: {
      const custmoersArray = payload as WarehouseingServiceType[]
      return custmoersArray
    }
    case WAREHOUSE_ACTION_TYPE.ADD: {
      return [...state, payload]
    }
    case WAREHOUSE_ACTION_TYPE.MODIFY: {
      const newModifiedCustomer = payload as WarehouseingServiceType
      const filteredCustomerState = state.filter((product) => product.id !== newModifiedCustomer.id)
      const newState = { ...filteredCustomerState, newModifiedCustomer }

      return [...newState]
    }
    case WAREHOUSE_ACTION_TYPE.DELETE: {
      return [...state.filter((product) => product.id !== payload)]
    }
    default: {
      return state
    }
  }
}
