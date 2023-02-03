import './dashboard-component.css'
import { Fragment, useContext, useEffect, useState } from 'react'
import { Table } from '../table/table-component'
import { CustomerContext } from '../../DATASTORE/contacts-reducer'
import { Indicator } from '../indicator/indicator-component'
import { IndicatorDetailed } from '../indicator-detailed/indicator-detailerd-component'
import { Chart } from 'react-google-charts'
import { Style } from 'util'
import { ChartComponent, DataType } from './chart-component/chart-component'
import { MainContext } from '../../utility/contexts/main.context'
import { ServiceProductType } from '../../DATASTORE/data-types/main.data.types/product-data-types'
import { PrepareChartData } from '../../DATASTORE/side-functions/side-functions'

export const Dashboard = () => {
  const { contracts } = useContext(MainContext)
  const { contractDataState } = contracts

  const [summarized, SetSummarized] = useState<any[]>()
  const [period, SetPeriod] = useState<'day' | 'minutes' | 'hours' | 'month'>('hours')

  //Total: income per category per year

  const total_category: DataType[] = [
    { m1: { TRANSPORT: 2000, WAREHOUSE: 2000, CUSTOM: 1000 } },
    { m2: { TRANSPORT: 3400, WAREHOUSE: 2000, CUSTOM: 1000 } },
    { m3: { TRANSPORT: 3000, WAREHOUSE: 1200, CUSTOM: 1000 } },
    { m4: { TRANSPORT: 3000, WAREHOUSE: 2000, CUSTOM: 1000 } },
  ]

  useEffect(() => {
    if (contractDataState.length <= 0) return

    SetSummarized(PrepareChartData({ switchPeriod: period, contractDataState: contractDataState }))
    return () => {}
  }, [contractDataState])

  return (
    <div className='dashboard-container'>
      <h1>Dashboard</h1>
      {summarized && <ChartComponent period={period} data={summarized as DataType[]} />}
    </div>
  )
}

// const qty = contractDataState[0].orders[0]?.ordered_products[0].products[0].ordered_qty
// const price = contractDataState[0].orders[0]?.ordered_products[0].products[0].unitPrice

// <div className='actual-content-container'>{/* <IndicatorDetailed /> */}</div>
// <div className='table-content-container'>{/* <Table customers={customers} /> */}</div>
