import { WarehouseingServiceType } from '../../main.data.types/product-data-types'
import { WAREHOUSE_ACTION_TYPE } from './warehouse.data.action.types'
import { WarehouseDispatchType } from './warehouse.data.reducer'
export const addWarehouse = (contract: WarehouseingServiceType): WarehouseDispatchType => ({ type: WAREHOUSE_ACTION_TYPE.ADD, payload: contract })
export const fillUpWarehouse = (customers: WarehouseingServiceType[]): WarehouseDispatchType => ({
  type: WAREHOUSE_ACTION_TYPE.FILL_DATA,
  payload: customers,
})
export const deleteWarehouse = (contract_id: string): WarehouseDispatchType => ({ type: WAREHOUSE_ACTION_TYPE.DELETE, payload: contract_id })
export const modifyWarehouse = (contract: WarehouseingServiceType): WarehouseDispatchType => ({
  type: WAREHOUSE_ACTION_TYPE.MODIFY,
  payload: contract,
})
