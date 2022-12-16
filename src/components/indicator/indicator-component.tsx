import './indicator-component.css'
import { useCallback, useEffect, useState } from 'react'

/**
 *
 * @param value 'example: 0.15'
 * @returns nothing
 */
export const Indicator = ({ value, color = 'blue', coords }: { value: number; color?: string; coords?: { X: number; Y: number } }): JSX.Element => {
  const [percet, setPercent] = useState(0)
  const [stopValue, setStopValue] = useState(0)
  const [id, setId] = useState<NodeJS.Timer | number | undefined>(undefined)
  const FULLPERCENT = 250
  const extraTranslations = 30
  let intervalID: NodeJS.Timer | number | undefined = undefined
  const timerCallback = useCallback(() => {
    if (intervalID) return
    intervalID = setInterval(() => {
      setPercent((prev) => prev + 1)
    }, 5)
    setId(intervalID)
  }, [value])

  useEffect(() => {
    setStopValue(FULLPERCENT * value)
    timerCallback()
    return () => {
      console.log('return')
      setPercent(0)
    }
  }, [value])

  useEffect(() => {
    return () => {
      if (percet >= stopValue) {
        if (!id) return
        for (let i = 0; i <= id; i++) {
          console.log('clear', percet <= stopValue, i, id)
          clearInterval(id)
        }
      }
    }
  }, [percet])

  return (
    <div
      className={`indicator-container tooltip`}
      style={coords ? { transform: `translate(${coords.X}px, ${coords.Y + extraTranslations}px)` } : { position: 'relative' }}
    >
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='140' height='140'>
        <circle
          strokeDasharray={FULLPERCENT}
          fill='transparent'
          strokeDashoffset={FULLPERCENT - percet}
          strokeLinecap='round'
          strokeWidth='5'
          cx='50'
          cy='50'
          r='40'
          id='circle'
        />
      </svg>
      <h3 className='indicator-percentage'>{Math.trunc((percet / FULLPERCENT) * 100)}%</h3>
    </div>
  )
}
