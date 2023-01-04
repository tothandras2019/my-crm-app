import './financial-info-panel-component.css'
import { formatter } from '../../../utility/number.formatter'
import { OpenCloseButton } from '../../tools/button/open-close/open-close-button-component'

export const FinancialInfoPanel = ({ summary }: { summary: number }) => {
  return (
    <div className='info-financial-panel'>
      <div className='info-financial-panel-summary'>
        <h2>Orders total</h2>
        <h4>{`${formatter.format(summary)}`} </h4>
      </div>
      <OpenCloseButton pageTextValue={'show details'} handler={() => {}} />
    </div>
  )
}
