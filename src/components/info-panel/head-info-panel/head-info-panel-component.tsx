import './head-info-panel-component.css'

import { GeneralType, LeadEnum, LifecicyleEnum } from '../../../DATASTORE/data-types/data-types'
import { ContractIcon, IdNo, Lifecycle, Status } from '../../../icons/svg/svg-icons-components'

export const HeadInfoPanel = ({
  id,
  lifecycleState,
  leadState,
  period,
}: {
  id: number
  lifecycleState: string
  leadState: string
  period: GeneralType
}) => {
  return (
    <div className='info-panel-head'>
      <div className='status'>
        <p> {IdNo()} </p>
        <h4>{id} </h4>
      </div>
      <div className='status'>
        <p> {Lifecycle()} </p>
        <h4>{lifecycleState} </h4>
      </div>
      <div className='status'>
        <p> {Status()} </p>
        <h4>{leadState}</h4>
      </div>
      <div className='status'>
        <p> {ContractIcon()} </p>
        <h4>
          {period.from}-{period.to}{' '}
        </h4>
      </div>
    </div>
  )
}
