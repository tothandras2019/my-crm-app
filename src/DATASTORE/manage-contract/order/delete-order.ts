import { ContractType } from '../../data-types/main.data.types/contract-data-types'

export const DELETE_ORDER_ON_CONTRACT = (contracts: ContractType[], contractID: string, order_id: string): ContractType | undefined => {
  console.log(contractID, order_id)

  const findContract = contracts.find((contract) => contract.id === contractID) as ContractType

  const filetedOrder = findContract.orders.filter((order) => order.order_id !== order_id)
  findContract.orders = filetedOrder

  console.log(findContract)

  return findContract
}
