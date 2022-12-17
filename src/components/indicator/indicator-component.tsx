import './indicator-component.css'
import { useCallback, useEffect, useState, useContext } from 'react'
import { CustomerContext } from './../../DATASTORE/contacts-reducer'

/**
 *
 * @param value 'example: 0.15'
 * @returns nothing
 */
export const Indicator = ({ value, color = 'blue', coords }: { value: number; color?: string; coords?: { X: number; Y: number } }): JSX.Element => {
  const [stopValue, setStopValue] = useState(0)
  const [id, setId] = useState<NodeJS.Timer | number | undefined>(undefined)
  const { percent, setPercent } = useContext(CustomerContext)
  const FULLPERCENT = 250
  const extraTranslations = 30
  let intervalID: NodeJS.Timer | number | undefined = undefined

  const ResetPercent = () => setPercent(0)
  const timerCallback = useCallback(() => {
    if (intervalID) return
    intervalID = setInterval(() => setPercent((prevState) => prevState + 1), 5)
    setId(intervalID)
  }, [value])

  const ClearAllInterval = () => {
    if (!id) return
    for (let i = 0; i <= id; i++) {
      clearInterval(id)
    }
  }

  useEffect(() => {
    ClearAllInterval()
    setStopValue(FULLPERCENT * value)
    timerCallback()
    return ResetPercent()
  }, [value])

  useEffect(() => {
    return () => {
      if (percent >= stopValue) ClearAllInterval()
    }
  }, [percent])

  return (
    <div
      className={`indicator-container tooltip`}
      style={coords ? { transform: `translate(${coords.X}px, ${coords.Y + extraTranslations}px)` } : { position: 'relative' }}
    >
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='140' height='140'>
        <circle
          strokeDasharray={FULLPERCENT}
          fill='transparent'
          strokeDashoffset={FULLPERCENT - percent}
          strokeLinecap='round'
          strokeWidth='5'
          cx='50'
          cy='50'
          r='40'
          id='circle'
        />
      </svg>
      <h3 className='indicator-percentage'>{Math.trunc((percent / FULLPERCENT) * 100)}%</h3>
    </div>
  )
}
