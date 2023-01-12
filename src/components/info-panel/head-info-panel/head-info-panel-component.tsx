import './head-info-panel-component.css'

import { GeneralType, LeadEnum, LifecicyleEnum } from '../../../DATASTORE/data-types/data-types'
import { ContractIconHandShakeSvg, IdNoSvg, LifecycleSvg, StatusSvg } from '../../../icons/sub-menu/svg-icons-components'

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
        <p> {IdNoSvg()} </p>
        <h4>{id} </h4>
      </div>
      <div className='status'>
        <p> {LifecycleSvg()} </p>
        <h4>{lifecycleState} </h4>
      </div>
      <div className='status'>
        <p> {StatusSvg()} </p>
        <h4>{leadState}</h4>
      </div>
      <div className='status'>
        <p> {ContractIconHandShakeSvg()} </p>
        <h4>{period}</h4>
      </div>
    </div>
  )
}
