import './main-info-panel-component.css'

import { InitCustomersType } from '../../DATASTORE/data-types/data-types'
import { Separator } from '../tools/separator/separator-component'
import { InfoPanel } from './address-info-panel/info-panel-component'
import { FinancialInfoPanel } from './financial-info-panel/financial-info-panel-component'
import { HeadInfoPanel } from './head-info-panel/head-info-panel-component'
import { CustomerDataType, SummaryCustomerOrdersAmountType } from '../../DATASTORE/data-types/main.data.types/customer-data-types'
import { IndicatorDetailed } from '../indicator-detailed/indicator-detailerd-component'
import { OpenCloseButton } from '../tools/button/open-close/open-close-button-component'
import { useContext, useEffect } from 'react'
import { OtherActionContexts } from '../../utility/contexts/action.context'
import { Order } from '../../DATASTORE/data-types/main.data.types/order-data-types'
import { OrderedProducts } from '../../DATASTORE/data-types/main.data.types/order-product-type'
import { ContractType } from '../../DATASTORE/data-types/main.data.types/contract-data-types'

type MainInfoPanelType = { customerIndex: number; customerData: SummaryCustomerOrdersAmountType }
export const MainInfoPannel = ({ customerIndex, customerData }: MainInfoPanelType) => {
  const { contract, summaryOrdersamount } = customerData
  const { id, date, customer, orders } = contract
  const { companyName, access, social, status, address } = customer
  const { lifecycleState, leadState } = status

  const { selectedCustomerData, SetSelectedCustomerType } = useContext(OtherActionContexts)

  const handleNewOrder = () => {
    const newOrderedProducts: OrderedProducts = { id: 100, products: [] }

    const newOrder: Order = {
      order_id: 345,
      order_date: new Date().toLocaleString(),
      ordered_products: [newOrderedProducts],
    }

    const newContrat: ContractType = { id: id, date: date, customer: customer, orders: [newOrder] }
    const contract = { contract: newContrat, summaryOrdersamount: summaryOrdersamount }

    SetSelectedCustomerType((state) => ({ ...state, customer: contract }))
    //contract reducer!!!
  }

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
          <OpenCloseButton color={`green`} pageTextValue={'add order'} handler={handleNewOrder} />
        </div>
      </div>
      <FinancialInfoPanel customerIndex={customerIndex} summary={summaryOrdersamount} />
    </div>
  )
}
