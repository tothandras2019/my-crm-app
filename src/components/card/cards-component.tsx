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
import { summary_ContractsAmount } from '../../DATASTORE/side-functions/side-functdions'

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

    const summaryContractsAmount = summary_ContractsAmount(contractDataState)

    setcustomersData(summaryContractsAmount)

    return () => {}
  }, [contractDataState])

  return (
    <div className='card-container'>
      {customersData &&
        customersData.map((customer, index) => {
          return <h4>Not works yet</h4>
        })}
    </div>
  )
}
