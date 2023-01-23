import { ContractType } from '../data-types/main.data.types/contract-data-types'
import { SummaryCustomerOrdersAmountType } from '../data-types/main.data.types/customer-data-types'
import { Order } from '../data-types/main.data.types/order-data-types'
import { ServiceProductType } from '../data-types/main.data.types/product-data-types'

export const summ_data = (orders: Order[]): number => {
  return orders.reduce((acc, order): number => {
    return (acc += order.ordered_products.reduce((accOrder: number, prod): number => {
      const product = prod.products as ServiceProductType[]
      accOrder += product.reduce<number>((sum: number, product: ServiceProductType) => {
        sum += product.ordered_qty * product.unitPrice
        return sum
      }, 0)
      return accOrder
    }, 0))
  }, 0)

  return 0
}

export const summary_ContractsAmount = (contracts: ContractType[]) => {
  return contracts.reduce((contractCustomerSummaryAcc: any, contractData: ContractType) => {
    const { customer, id, date, orders } = contractData

    let contracDataObject: SummaryCustomerOrdersAmountType | undefined = contractCustomerSummaryAcc.find(
      (contractSumary: SummaryCustomerOrdersAmountType) => contractSumary.contract.id === customer.id,
    )

    const summ = summ_data(orders)

    if (!contracDataObject) {
      contracDataObject = {
        contract: contractData,
        summaryOrdersamount: summ,
      }

      return [...contractCustomerSummaryAcc, contracDataObject]
    } else {
      const filteredContractCustomerSummaryAcc = contractCustomerSummaryAcc.filter(
        (contractSumary: SummaryCustomerOrdersAmountType) => contractSumary.contract.id !== customer.id,
      )
      const modifiedContracDataObject = { ...contracDataObject, summaryOrdersamount: (contracDataObject.summaryOrdersamount += summ) }
      return [...filteredContractCustomerSummaryAcc, modifiedContracDataObject]
    }
  }, [])
}
