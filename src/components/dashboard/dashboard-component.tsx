import './dashboard-component.css'
import { Fragment, useContext } from 'react'
import { Table } from '../table/table-component'
import { CustomerContext } from '../../DATASTORE/contacts-reducer'
import { Indicator } from '../indicator/indicator-component'
import { IndicatorDetailed } from '../indicator-detailed/indicator-detailerd-component'
import { Chart } from 'react-google-charts'

export const Dashboard = () => {
  const { customers } = useContext(CustomerContext)
  const points = [
    ['Year', 'Visitations', { role: 'style' }],
    ['2010', 10, 'color: gray'],
    ['2020', 14, 'color: #76A7FA'],
    ['2030', 16, 'color: blue'],
    ['2040', 22, 'stroke-color: #703593; stroke-width: 4; fill-color: #C5A5CF'],
    ['2050', 28, 'stroke-color: #871B47; stroke-opacity: 0.6; stroke-width: 8; fill-color: #BC5679; fill-opacity: 0.2'],
  ]

  return (
    <div className='dashboard-container'>
      <h1>Dashboard</h1>
      <div className='table-content-container'>
        <Chart
          data={points}
          chartType={'ScatterChart'}
          options={{ height: 800, width: 700, title: 'Adatok cím', vAxis: { viewWindow: { max: 50 } } }}
        />
      </div>
    </div>
  )
}

// <div className='actual-content-container'>{/* <IndicatorDetailed /> */}</div>
// <div className='table-content-container'>{/* <Table customers={customers} /> */}</div>
