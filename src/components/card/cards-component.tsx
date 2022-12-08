import './cards-component.css'

import { InfoPannel } from '../info-panel/info-panel-component'
import { InitCustomersType } from './../../DATASTORE/contacts-reducer'

export const Cards = ({ customers }: { customers: InitCustomersType[] }): JSX.Element => {
  return (
    <div className='card-container'>
      {customers.map((customer, i) => {
        return <InfoPannel key={`${customer}-${i}`} customer={customer} />
      })}
    </div>
  )
}
