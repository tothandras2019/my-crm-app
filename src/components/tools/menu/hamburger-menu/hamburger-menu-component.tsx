import './hamburger-menu-component.css'
import { SyntheticEvent, useState } from 'react'

export const HamburgerMenu = ({ handler }: { handler: () => void }) => {
  const [isClose, setIsClose] = useState(false)

  const handleclose = (event: SyntheticEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement
    setIsClose(!isClose)
    handler()
  }

  return (
    <div className={`menu-button ${isClose ? 'close' : ''}`} onClick={handleclose}>
      <span></span>
    </div>
  )
}
