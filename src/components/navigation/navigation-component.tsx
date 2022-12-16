import { useState } from 'react'
import { Menu } from '../menu/rotating-menu/menu-component'
import { LinkButton } from '../tools/button/link/link-button-component'
import './navigation-component.css'

export const Navigation = (): JSX.Element => {
  const navigationItems = ['home', 'dashboard', 'new customer']
  const [hide, setHide] = useState(true)
  const handleHideNavigation = () => setHide((state) => !state)

  return (
    <nav className={`${hide ? 'hide' : ''}`}>
      <Menu items={navigationItems} hideElement={{ value: hide, setter: setHide }} />
    </nav>
  )
}
