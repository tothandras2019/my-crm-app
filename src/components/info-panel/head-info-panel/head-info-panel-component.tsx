import './head-info-panel-component.css'

import { GeneralType, LeadEnum, LifecicyleEnum } from '../../../DATASTORE/data-types/data-types'
import { ContractIcon, IdNo, Lifecycle, Status } from '../../../icons/sub-menu/svg-icons-components'

type HeadInfoPanelType = {
  id: number | string
  lifecycleState: string
  leadState: string
  period: string
}
export const HeadInfoPanel = ({ id, lifecycleState, leadState, period }: Partial<HeadInfoPanelType>) => {
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
      </div>
    </div>
  )
}
