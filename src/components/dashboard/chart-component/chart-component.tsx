import { useEffect, useState } from 'react'
import Chart from 'react-google-charts'

export type DataType = { [key: string]: { TRANSPORT: number; WAREHOUSE: number; CUSTOM: number } }
type ChartComponentType = { period: string; data: DataType[] }
export const ChartComponent = ({ period, data }: ChartComponentType) => {
  const ChartStyle: React.CSSProperties = { padding: '5px' }
  const columntColors = ['green', 'black', 'orange']

  const [chartPoint, SetChartPoint] = useState<any>()
  const [maxValue, SetMaxValue] = useState<number>(0)

  const setChartPoints = () => {
    const chartpoints = [[period]]
    let maxV = 0

    data.forEach((dat) => {
      Object.entries(dat).forEach(([interval, value], index) => {
        const datePeriod: any[] = [`${interval}`]

        Object.entries(value).forEach(([key, val]) => {
          if (!chartpoints[0].includes(key)) chartpoints[0] = [...chartpoints[0], key]

          maxV = val > maxV ? val : maxV

          datePeriod.push(val)
        })
        chartpoints.push(datePeriod)
      })
    })
    SetMaxValue(maxV + 200)
    // console.log(chartpoints)
    return chartpoints
  }

  useEffect(() => {
    if (!data) return
    const result = setChartPoints()
    SetChartPoint(result)
  }, [data])

  const chartOptions = {
    colors: columntColors,
    backgroundColor: 'transparent',
    height: 500,
    width: 700,
    title: `Total income per ${period}`,
    vAxis: { title: 'income', viewWindow: { max: maxValue } },
    hAxis: { title: period },
    lineWidth: 5,
    bar: { groupWidth: 50 },
    showTooltip: true,
    showInfoWindow: false,
    headerHeight: 300,
    legend: { position: 'right', maxLines: 3 },
    showScale: true,
  }

  return (
    <div className='chart-container'>
      {chartPoint && <Chart data={chartPoint} chartType={'ColumnChart'} options={chartOptions} style={ChartStyle} />}
    </div>
  )
}
