import './menu-component.css'
import { LinkButton } from '../../tools/button/link/link-button-component'
import { useEffect, useState } from 'react'
import { HamburgerMenu } from '../../tools/menu/hamburger-menu/hamburger-menu-component'

export const Menu = (): JSX.Element => {
  const [closeMenu, setCloseMenu] = useState(false)

  const menItems = [
    'sales performance',
    'success order',
    'summary',
    'account',
    'settings',
    'sales performance',
    'success order',
    'summary',
    'account',
    'settings',
  ]
  const positionDegree = 360 / menItems.length
  const handleCloseMenu = () => {
    setCloseMenu(!closeMenu)
  }

  useEffect(() => {}, [menItems])
  return (
    <div className={`menu-container ${closeMenu ? 'close' : ''}`}>
      {menItems.map((item, i) => (
        <LinkButton key={`item--${i}`} value={item} rotating={positionDegree * i} hide={closeMenu} />
      ))}
      {/* <div className={`menu-link-container ${closeMenu ? 'close' : ''}`}>
      </div> */}
      <HamburgerMenu handler={handleCloseMenu} />
    </div>
  )
}
