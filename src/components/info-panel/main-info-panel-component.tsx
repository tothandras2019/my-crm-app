import './main-info-panel-component.css'

import { CustomersArrayType } from '../../DATASTORE/contacts-reducer'
import { InitCustomersType } from '../../DATASTORE/data-types/data-types'
import { ContractIcon } from '../../icons/svg/svg-icons-components'
import { formatter } from '../../utility/utility'
import { Separator } from '../tools/separator/separator-component'
import { InfoPanel } from './address-info-panel/info-panel-component'
import { FinancialInfoPanel } from './financial-info-panel/financial-info-panel-component'
import { HeadInfoPanel } from './head-info-panel/head-info-panel-component'
export const MainInfoPannel = ({ customer }: { customer: InitCustomersType }) => {
  const { id, companyName, access, address, status, contract, social, contacts, subscribed, period } = customer
  const { lifecycleState, leadState } = status
  const { total } = contract

  return (
    <div className='info-panel-card'>
      <HeadInfoPanel id={id} lifecycleState={lifecycleState} leadState={leadState} period={period} />
      <Separator />
      <h1 className='info-title'>{companyName}</h1>
      <FinancialInfoPanel contract={contract} />
      <Separator />

      <div className='info-contacts'>
        <h3>Contacts</h3>
        <InfoPanel title={'addresses'} address={address} />
        <InfoPanel title={'socials'} address={social} />
      </div>
    </div>
  )
}
