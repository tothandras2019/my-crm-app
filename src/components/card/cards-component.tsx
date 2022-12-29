import './cards-component.css'

import { MainInfoPannel } from '../info-panel/main-info-panel-component'
import { InitCustomersType } from './../../DATASTORE/data-types/data-types'
import { useContext, useEffect } from 'react'
import { MainContext } from '../../utility/contexts/main.context'

export const Cards = (): JSX.Element => {
  const { customers } = useContext(MainContext)
  const { customerState } = customers

  useEffect(() => {
    return () => {}
  }, [])

  return (
    <div className='card-container'>
      {customerState?.map((customer, i) => {
        return <MainInfoPannel key={`${customer}-${i}`} customer={customer} />
      })}
    </div>
  )
}
