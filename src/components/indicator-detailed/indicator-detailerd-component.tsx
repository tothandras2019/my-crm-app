import './indicator-detailerd-component.css'
import { useContext, useEffect, useState } from 'react'
import { Indicator } from '../indicator/indicator-component'
import { SummaryDetails } from '../table/summary-details/summary-details-component'
import { CustomerContext } from './../../DATASTORE/contacts-reducer'
export const IndicatorDetailed = () => {
  const { active } = useContext(CustomerContext)
  const [value, setValue] = useState<number>(0)
  useEffect(() => {
    if (!active) return
    const summary = active.subscribed.products.reduce((acc, value) => (acc += value.quantity * value.price), 0)
    const percent = summary / active.contract.total
    setValue(percent)
  }, [active])
  return (
    <div className='indicator-detailed'>
      <Indicator value={value} />
      <SummaryDetails items={['elso', 'masodi9k', 'harmadik']} />
    </div>
  )
}
