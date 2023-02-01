import './financial-info-panel-component.css'
import { formatter } from '../../../utility/number.formatter'
import { OpenCloseButton } from '../../tools/button/open-close/open-close-button-component'
import { Dispatch, SetStateAction, useContext, useEffect } from 'react'
import { OtherActionContexts } from '../../../utility/contexts/action.context'

type FinancialInfoPanelType = { customerIndex: number; summary: number; ShowOrdersData: Dispatch<SetStateAction<boolean>> }
export const FinancialInfoPanel = ({ customerIndex, summary, ShowOrdersData }: FinancialInfoPanelType) => {
  const { showOrders, SetShowOrders } = useContext(OtherActionContexts)
  const handleShowOrders = () => ShowOrdersData((state) => !state)
  // const tempOrderIndexs = showOrders.indexs.map((val, index) => (index === customerIndex ? !val : val))
  // SetShowOrders((state) => ({ ...state, indexs: tempOrderIndexs }))

  // useEffect(() => {
  //   console.log(showOrders)
  // }, [showOrders])

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
