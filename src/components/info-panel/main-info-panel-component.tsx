import './main-info-panel-component.css'
import { useContext, useEffect } from 'react'

import { InitCustomersType } from '../../DATASTORE/data-types/data-types'
import { Separator } from '../tools/separator/separator-component'
import { InfoPanel } from './address-info-panel/info-panel-component'
import { FinancialInfoPanel } from './financial-info-panel/financial-info-panel-component'
import { HeadInfoPanel } from './head-info-panel/head-info-panel-component'
import { CustomerDataType, SummaryCustomerOrdersAmountType } from '../../DATASTORE/data-types/main.data.types/customer-data-types'
import { IndicatorDetailed } from '../indicator-detailed/indicator-detailerd-component'
import { OpenCloseButton } from '../tools/button/open-close/open-close-button-component'
import { OtherActionContexts } from '../../utility/contexts/action.context'
import { Order } from '../../DATASTORE/data-types/main.data.types/order-data-types'
import { OrderedProducts } from '../../DATASTORE/data-types/main.data.types/order-product-type'
import { ContractType } from '../../DATASTORE/data-types/main.data.types/contract-data-types'
import { MainContext } from '../../utility/contexts/main.context'
import { modifyContract } from './../../../src/DATASTORE/data-types/man.data.reducers/contracts-reducer/contracts.data.actions'
import { ID_GENERATOR } from '../../DATASTORE/side-functions/id-generator'
import { ADD_ORDER_TO_CONTRACT } from '../../DATASTORE/manage-contract/order/add-order'

type MainInfoPanelType = { customerIndex: number; customerData: SummaryCustomerOrdersAmountType }
export const MainInfoPannel = ({ customerIndex, customerData }: MainInfoPanelType) => {
  const { contract, summaryOrdersamount } = customerData
  const { id, date, customer, orders } = contract
  const { companyName, access, social, status, address } = customer
  const { lifecycleState, leadState } = status

  const { SetSelectedCustomerType } = useContext(OtherActionContexts)
  const { contracts } = useContext(MainContext)
  const { ContractsDataDispatch } = contracts

  const handle_ADD_ORDER = () => ContractsDataDispatch(modifyContract(ADD_ORDER_TO_CONTRACT(contract)))

  return (
    <div className='info-panel-card' id={id}>
      <div className='info-panel-card-left'>
        <div>
          <HeadInfoPanel lifecycleState={lifecycleState} leadState={leadState} period={date} id={id} />
          <Separator />
          <h1 className='info-title'>{companyName}</h1>
        </div>

        <div className='info-contacts'>
          <h3>Contacts info</h3>
          <div>
            <InfoPanel title={'addresses'} address={address} />
            <InfoPanel title={'socials'} address={social} />
          </div>
        </div>
      </div>
      <div className='order-actions-container'>
        <h2>Order actions</h2>
        <div>
          <OpenCloseButton color={`green`} pageTextValue={'add order'} handler={handle_ADD_ORDER} />
        </div>
      </div>
      <FinancialInfoPanel customerIndex={customerIndex} summary={summaryOrdersamount} />
    </div>
  )
}
