import './dashboard-component.css'
import { Fragment, useContext } from 'react'
import { Table } from '../table/table-component'
import { CustomerContext } from '../../DATASTORE/contacts-reducer'
import { Indicator } from '../indicator/indicator-component'
import { IndicatorDetailed } from '../indicator-detailed/indicator-detailerd-component'

export const Dashboard = () => {
  const { customers } = useContext(CustomerContext)
  return (
    <div className='dashboard-container'>
      <h1>Company Name</h1>
      <div className='actual-content-container'>
        <IndicatorDetailed />
      </div>
      <div className='table-content-container'>
        <Table customers={customers} />
      </div>
    </div>
  )
}
