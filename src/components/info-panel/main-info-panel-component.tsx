import './main-info-panel-component.css'

import { InitCustomersType } from '../../DATASTORE/data-types/data-types'
import { Separator } from '../tools/separator/separator-component'
import { InfoPanel } from './address-info-panel/info-panel-component'
import { FinancialInfoPanel } from './financial-info-panel/financial-info-panel-component'
import { HeadInfoPanel } from './head-info-panel/head-info-panel-component'
import { CustomerDataType, SummaryCustomerOrdersAmountType } from '../../DATASTORE/data-types/main.data.types/customer-data-types'
import { IndicatorDetailed } from '../indicator-detailed/indicator-detailerd-component'
import { OpenCloseButton } from '../tools/button/open-close/open-close-button-component'

type MainInfoPanelType = { customer: SummaryCustomerOrdersAmountType }
export const MainInfoPannel = ({ customer }: MainInfoPanelType) => {
  const { id, date, companyName, access, address, status, social, summaryOrdersamount } = customer
  const { lifecycleState, leadState } = status

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
          <OpenCloseButton color={`green`} pageTextValue={'new order'} handler={() => {}} />
        </div>
      </div>
      <FinancialInfoPanel summary={summaryOrdersamount} />
    </div>
  )
}
