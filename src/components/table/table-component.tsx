//   })
import './table-component.css'

import { InitCustomersType } from '../../DATASTORE/data-types/data-types'
import { formatter } from '../../utility/utility'
import { Indicator } from '../indicator/indicator-component'
import { SyntheticEvent, useCallback, useRef, useState } from 'react'
import { usePosition } from '../../utility/useHooks'

export const Table = ({ customers }: { customers: InitCustomersType[] }) => {
  // const headersHelper = ['id', 'companyName', 'status', 'contract', 'subscribed']
  const headersHelper = ['id', 'companyName', 'status', 'contract', 'subscribed', 'orders aboumt']
  const [showContractTooltip, setShowContractTooltip] = useState(false)
  const [showSummaryTooltip, setShowSummaryTooltip] = useState(false)
  const [toolTipPosition, setToolTipPosition] = useState({ X: 0, Y: 0 })
  const [position, setPosition] = usePosition()

  const contractAmountRef = useRef<HTMLDivElement>(null)
  const productSummaryRef = useRef<HTMLDivElement>(null)

  const ManageCurrentAndEvent = (currentElement: HTMLElement, coughtMouseEvent: MouseEvent) =>
    setPosition(() => ({ element: currentElement, event: coughtMouseEvent }))

  //CONTRACTS EVENTS:
  const handleMouseMoveToContract = (event: SyntheticEvent<HTMLDivElement>) => {
    const currentElement = contractAmountRef.current
    if (currentElement) ManageCurrentAndEvent(currentElement, event.nativeEvent as MouseEvent)
    setToolTipPosition((prev) => ({ X: position.x, Y: position.y }))
  }

  const handleMouseEnterToContract = (event: SyntheticEvent<HTMLDivElement>) => setShowContractTooltip(true)
  const handleMouseLeaveToContract = (event: SyntheticEvent<HTMLDivElement>) => setShowContractTooltip(false)

  //SUMMARY EVENTS:
  const handleMouseMoveOnSummary = (event: SyntheticEvent<HTMLDivElement>) => {
    const currentElement = productSummaryRef.current
    if (currentElement) ManageCurrentAndEvent(currentElement, event.nativeEvent as MouseEvent)
    setToolTipPosition((prev) => ({ X: position.x, Y: position.y }))
  }
  const handleMouseEnterToSummary = (event: SyntheticEvent<HTMLDivElement>) => setShowSummaryTooltip(true)
  const handleMouseLeaveToSummary = (event: SyntheticEvent<HTMLDivElement>) => setShowSummaryTooltip(false)

  return (
    <div className='table-container'>
      <div className='table-container-header'>
        {headersHelper.map((keys, i) => {
          return <p key={`${keys}-${i}`}>{keys} 🔽</p>
        })}
      </div>
      {customers.map((customer, index) => {
        const { id, companyName, status, contract, subscribed } = customer
        const summOrders = subscribed.products.reduce((reduce, prodItem) => (reduce += prodItem.quantity * prodItem.price), 0)
        const productDetails = subscribed.products.map(({ name, quantity, price }, i) => (
          <div key={i} style={{ backgroundColor: 'transparent' }}>
            <p style={{ fontSize: '13px' }}>
              name:{name} , quantity:{quantity}, price:{price}
            </p>
          </div>
        ))
        return (
          <div key={`${index}--${id} `} className={`customer ${index % 2 === 0 ? '' : 'odd'}`}>
            <p>{id}</p>
            <p>{companyName}</p>
            <div>
              <p>{status.leadState}</p>
              <p>{status.lifecycleState}</p>
            </div>
            <div
              ref={contractAmountRef}
              className='contract-amount'
              onMouseEnter={handleMouseEnterToContract}
              onMouseMove={handleMouseMoveToContract}
              onMouseLeave={handleMouseLeaveToContract}
            >
              <p>{formatter.format(contract.total)}</p>
              <p>{formatter.format(contract.achieved)}</p>
              {showContractTooltip && <Indicator value={contract.achieved / contract.total} coords={toolTipPosition} />}
            </div>
            <p>{subscribed.products.length}</p>
            <div
              ref={productSummaryRef}
              onMouseEnter={handleMouseEnterToSummary}
              onMouseMove={handleMouseMoveOnSummary}
              onMouseLeave={handleMouseLeaveToSummary}
            >
              <p>{formatter.format(summOrders)}</p>
              {showSummaryTooltip && (
                <div
                  style={{
                    backgroundColor: 'grey',
                    position: 'fixed',
                    transform: `translate(${toolTipPosition.X}px, ${toolTipPosition.Y}px)`,
                  }}
                >
                  {productDetails}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
