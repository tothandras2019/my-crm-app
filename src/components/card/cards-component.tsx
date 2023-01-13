import './cards-component.css'

import { MainInfoPannel } from '../info-panel/main-info-panel-component'
import { AddressType, InitCustomersType } from './../../DATASTORE/data-types/data-types'
import { useContext, useEffect, useState } from 'react'
import { MainContext } from '../../utility/contexts/main.context'
import { ContractType } from '../../DATASTORE/data-types/main.data.types/contract-data-types'
import { CustomersArrayType } from '../../DATASTORE/contacts-reducer'
import {
  AccessType,
  CustomerDataType,
  SocialType,
  StatusType,
  SummaryCustomerOrdersAmountType,
} from './../../DATASTORE/data-types/main.data.types/customer-data-types'
import { Order } from '../../DATASTORE/data-types/main.data.types/order-data-types'
import { OtherActionContexts } from '../../utility/contexts/action.context'

export const Cards = (): JSX.Element => {
  const { SetShowOrders } = useContext(OtherActionContexts)
  const { contracts } = useContext(MainContext)
  const { contractDataState } = contracts

  const [customersData, setcustomersData] = useState<SummaryCustomerOrdersAmountType[] | null | undefined>(null)

  const GenerateBooleanArray = () => {
    const length = contractDataState.length
    let result = []
    for (let i = 0; i < length; i++) {
      result.push(false)
    }
    return result
  }

  useEffect(() => {
    const tempIndex = GenerateBooleanArray()
    SetShowOrders((state) => ({ ...state, indexs: tempIndex }))

    const summdata = (orders: Order[]): number => {
      return orders.reduce((acc, order) => {
        return (acc += order.ordered_products.reduce((accOrder: number, prod) => {
          return (accOrder += prod.products.reduce((s, v) => {
            s += v.unitPrice * v.ordered_qty
            return s
          }, 0))
        }, 0))
      }, 0)
    }

    const summaryContractsAmount = (contractDataState as ContractType[]).reduce((contractCustomerSummaryAcc: any, contractData: ContractType) => {
      const { customer, id, date, orders } = contractData

      let contracDataObject: SummaryCustomerOrdersAmountType | undefined = contractCustomerSummaryAcc.find(
        (contract: SummaryCustomerOrdersAmountType) => contract.id === customer.id,
      )

      const summ = summdata(orders)

      if (!contracDataObject) {
        contracDataObject = {
          id: id,
          date: date,
          companyName: customer.companyName,
          address: customer.address,
          access: customer.access,
          social: customer.social,
          status: customer.status,
          summaryOrdersamount: summ,
        }

        return [...contractCustomerSummaryAcc, contracDataObject]
      } else {
        const filteredContractCustomerSummaryAcc = contractCustomerSummaryAcc.filter(
          (contract: SummaryCustomerOrdersAmountType) => contract.id !== customer.id,
        )
        const modifiedContracDataObject = { ...contracDataObject, summaryOrdersamount: (contracDataObject.summaryOrdersamount += summ) }
        return [...filteredContractCustomerSummaryAcc, modifiedContracDataObject]
      }
    }, [])

    setcustomersData(summaryContractsAmount)

    return () => {}
  }, [contractDataState])

  return (
    <div className='card-container'>
      {customersData &&
        customersData.map((customer, index) => {
          return <></>
        })}
    </div>
  )
}
