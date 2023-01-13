import './financial-info-panel-component.css'
import { formatter } from '../../../utility/number.formatter'
import { OpenCloseButton } from '../../tools/button/open-close/open-close-button-component'
import { useContext } from 'react'
import { OtherActionContexts } from '../../../utility/contexts/action.context'

export const FinancialInfoPanel = ({ summary }: { summary: number }) => {
  const { SetShowOrders } = useContext(OtherActionContexts)
  const handleShowOrders = () => SetShowOrders((state) => ({ ...state, isShow: !state.isShow }))

  return (
    <div className='info-financial-panel'>
      <OpenCloseButton pageTextValue={'show details'} handler={handleShowOrders} />
      <div className='info-financial-panel-summary'>
        <h4>orders total</h4>
        <h4>{`${formatter.format(summary)}`} </h4>
      </div>
    </div>
  )
}
