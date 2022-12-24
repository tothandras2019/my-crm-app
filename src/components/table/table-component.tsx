//   })
import './table-component.css'

import { InitCustomersType } from '../../DATASTORE/data-types/data-types'
import { formatter } from '../../utility/number.formatter'
import { SyntheticEvent, useEffect, useRef, useState, useContext, FormEvent, FC } from 'react'
import { usePosition } from '../../utility/custom-hooks/usePosition'
import { CustomerContext } from './../../DATASTORE/contacts-reducer'

type ShowIdType = { id: number; isShowContract: boolean; isShowAmount: boolean }

export const Table = ({ customers }: { customers: InitCustomersType[] }): JSX.Element => {
  //#region VARIABLES
  // const headersHelper = ['id', 'companyName', 'status', 'contract', 'subscribed']
  const headersHelper = ['id', 'companyName', 'status', 'contract', 'subscribed', 'orders aboumt']
  const [showContractTooltip, setShowContractTooltip] = useState(false)
  const [showSummaryTooltip, setShowSummaryTooltip] = useState(false)
  const [toolTipPosition, setToolTipPosition] = useState({ X: 0, Y: 0 })
  const [position, setPosition] = usePosition()
  const [isShownIds, setIsShownIds] = useState<ShowIdType[]>([])

  const { setActive } = useContext(CustomerContext)

  const contractAmountRef = useRef<HTMLDivElement>(null)
  const productSummaryRef = useRef<HTMLDivElement>(null)
  //#endregion
  //#region GENERAL FUNCTIONS:
  const ManageCurrentAndEvent = (currentElement: HTMLElement, coughtMouseEvent: MouseEvent) =>
    setPosition(() => ({ element: currentElement, event: coughtMouseEvent }))

  useEffect(() => {
    if (isShownIds.length !== 0) return
    const idsArray: ShowIdType[] = []
    customers.forEach(({ id }) => idsArray.push({ id: id, isShowContract: false, isShowAmount: false }))
    setIsShownIds((prev) => [...prev, ...idsArray])
  }, [customers])

  const setIdVisibility = (target: HTMLDivElement | null, key: string, value: boolean) => {
    const dataSetId = target?.getAttribute('data-id')?.split('-')[1]
    let modShownIds: typeof isShownIds
    if (!dataSetId) {
      modShownIds = isShownIds.map((items) => ({ ...items, [key]: value }))
    } else {
      modShownIds = isShownIds.map((items) => (items.id === parseInt(dataSetId) ? { ...items, [key]: value } : items))
    }

    setIsShownIds(modShownIds)
  }
  //#endregion
  //#region CONTRACTS EVENTS:
  const handleMouseMoveToContract = (event: FormEvent<HTMLDivElement>) => {
    const currentElement = contractAmountRef.current
    if (currentElement) ManageCurrentAndEvent(currentElement, event.nativeEvent as MouseEvent)
    setToolTipPosition(() => ({ X: position.x, Y: position.y }))
  }

  const handleMouseEnterToContract = (event: FormEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement
    setIdVisibility(target, 'isShowContract', true)
    setShowContractTooltip(true)
  }
  const handleMouseLeaveToContract = () => {
    setIdVisibility(null, 'isShowContract', false)
    setShowContractTooltip(false)
  }
  //#endregion
  //#region SUMMARY EVENTS:----------------------------
  const handleMouseMoveOnSummary = (event: FormEvent<HTMLDivElement>) => {
    const currentElement = productSummaryRef.current
    if (currentElement) ManageCurrentAndEvent(currentElement, event.nativeEvent as MouseEvent)
    setToolTipPosition(() => ({ X: position.x, Y: position.y }))
  }
  const handleMouseEnterToSummary = (event: FormEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement
    setIdVisibility(target, 'isShowAmount', true)
    setShowSummaryTooltip(true)
  }
  const handleMouseLeaveToSummary = () => {
    setIdVisibility(null, 'isShowAmount', false)
    setShowSummaryTooltip(false)
  }

  const handleChooseCustomer = (customer: InitCustomersType) => {
    setActive(customer)
  }
  //#endregion
  //#region RENDERING
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
        return (
          <div key={`${index}--${id}`} className={`customer ${index % 2 === 0 ? '' : 'odd'}`} onClick={() => handleChooseCustomer(customer)}>
            <p>{id}</p>
            <p>{companyName}</p>
            <div>
              <p>{status.leadState}</p>
              <p>{status.lifecycleState}</p>
            </div>
            <div
              data-id={`amount-${id}`}
              ref={contractAmountRef}
              className='contract-amount'
              onMouseEnter={handleMouseEnterToContract}
              onMouseMove={handleMouseMoveToContract}
              onMouseLeave={handleMouseLeaveToContract}
            >
              <p>{formatter.format(contract.total)}</p>
              <p>{formatter.format(summOrders)}</p>
              {/* {showContract && showContractTooltip && <Indicator value={contract.achieved / contract.total} coords={toolTipPosition} />} */}
            </div>
            <p>{subscribed.products.length}</p>
            <div
              data-id={`summary-${id}`}
              ref={productSummaryRef}
              onMouseEnter={handleMouseEnterToSummary}
              onMouseMove={handleMouseMoveOnSummary}
              onMouseLeave={handleMouseLeaveToSummary}
            >
              <p>{formatter.format(summOrders)}</p>
              {/* {showAmount && showSummaryTooltip && <SummaryDetails coords={toolTipPosition} items={subscribed.products} />} */}
            </div>
          </div>
        )
      })}
    </div>
  )
  //#endregion
}
