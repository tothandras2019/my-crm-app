import './cards-component.css'

import { MainInfoPannel } from '../info-panel/main-info-panel-component'
import { InitCustomersType } from './../../DATASTORE/data-types/data-types'
import { useContext, useEffect } from 'react'

export const Cards = ({ customers }: { customers: InitCustomersType[] }): JSX.Element => {
  useEffect(() => {
    return () => {}
  }, [])

  return (
    <div className='card-container'>
      {customers.map((customer, i) => {
        return <MainInfoPannel key={`${customer}-${i}`} customer={customer} />
      })}
    </div>
  )
}
