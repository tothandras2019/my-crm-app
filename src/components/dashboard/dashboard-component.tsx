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
import { CustomButton } from '../tools/button/submit/custom-button-component'
import { OpenCloseButton } from './../tools/button/open-close/open-close-button-component'

export const Dashboard = () => {
  const { contracts } = useContext(MainContext)
  const { contractDataState } = contracts

  const [summarized, SetSummarized] = useState<any[]>()
  const periodArray = ['day', 'minutes', 'hours', 'month']
  const [index, SetIndex] = useState(0)

  useEffect(() => {
    if (contractDataState.length <= 0) return

    SetSummarized(PrepareChartData({ switchPeriod: periodArray[index], contractDataState: contractDataState }))
    return () => {}
  }, [contractDataState])

  const handle_switch_period = () => {
    const periodLenth = periodArray.length

    if (periodLenth - 1 > index) {
      SetIndex((state) => state + 1)

      return
    }
    SetIndex(0)
  }

  useEffect(() => {
    SetSummarized(PrepareChartData({ switchPeriod: periodArray[index], contractDataState: contractDataState }))
  }, [index])

  return (
    <div className='dashboard-container'>
      {summarized && (
        <div className='chart-container'>
          <div>
            <OpenCloseButton pageTextValue={periodArray[index]} color={'green'} handler={handle_switch_period} />
          </div>
          <ChartComponent period={periodArray[index]} data={summarized as DataType[]} />
        </div>
      )}
    </div>
  )
}

// BACKUPS:
// const qty = contractDataState[0].orders[0]?.ordered_products[0].products[0].ordered_qty
// const price = contractDataState[0].orders[0]?.ordered_products[0].products[0].unitPrice

// <div className='actual-content-container'>{/* <IndicatorDetailed /> */}</div>
// <div className='table-content-container'>{/* <Table customers={customers} /> */}</div>

// const total_category: DataType[] = [
//   { m1: { TRANSPORT: 2000, WAREHOUSE: 2000, CUSTOM: 1000 } },
//   { m2: { TRANSPORT: 3400, WAREHOUSE: 2000, CUSTOM: 1000 } },
//   { m3: { TRANSPORT: 3000, WAREHOUSE: 1200, CUSTOM: 1000 } },
//   { m4: { TRANSPORT: 3000, WAREHOUSE: 2000, CUSTOM: 1000 } },
// ]
