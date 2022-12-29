import './main-info-panel-component.css'

import { InitCustomersType } from '../../DATASTORE/data-types/data-types'
import { Separator } from '../tools/separator/separator-component'
import { InfoPanel } from './address-info-panel/info-panel-component'
import { FinancialInfoPanel } from './financial-info-panel/financial-info-panel-component'
import { HeadInfoPanel } from './head-info-panel/head-info-panel-component'
import { CustomerDataType } from '../../DATASTORE/data-types/main.data.types/customer-data-types'
import { IndicatorDetailed } from '../indicator-detailed/indicator-detailerd-component'

type MainInfoPanelType = { customer: CustomerDataType }
export const MainInfoPannel = ({ customer }: MainInfoPanelType) => {
  // const { id, companyName, access, address, status, contract, social, contacts, subscribed, period } = customer
  const { id, companyName, access, address, status, social } = customer
  const { lifecycleState, leadState } = status

  return (
    <div className='info-panel-card' id={id}>
      <div className='info-panel-card-left'>
        <HeadInfoPanel lifecycleState={lifecycleState} leadState={leadState} />
        <Separator />
        <h1 className='info-title'>{companyName}</h1>
        <Separator />

        <div className='info-contacts'>
          <h3>Contacts info</h3>
          <InfoPanel title={'addresses'} address={address} />
          <InfoPanel title={'socials'} address={social} />
        </div>
      </div>
      {/* <FinancialInfoPanel contract={contract} /> */}
      <IndicatorDetailed />
    </div>
  )
}
