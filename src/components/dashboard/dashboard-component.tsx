import { Fragment, useContext } from 'react'
import { Table } from '../table/table-component'
import './dashboard-component.css'
import { CustomerContext } from '../../DATASTORE/contacts-reducer'
import { Indicator } from '../indicator/indicator-component'
import { IndicatorDetailed } from '../indicator-detailed/indicator-detailerd-component'

export const Dashboard = () => {
  const { customers } = useContext(CustomerContext)
  return (
    <Fragment>
      <h1>Company Name</h1>
      <div className='actual-content-container'>
        <IndicatorDetailed />
      </div>
      <div className='table-content-container'>
        <Table customers={customers} />
      </div>
    </Fragment>
  )
}
