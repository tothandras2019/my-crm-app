import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu } from '../menu/header-menu/menu-component'
import { Section } from '../section/section-component'
import { LinkButton } from '../tools/button/link/link-button-component'
import './navigation-component.css'

export const Navigation = (): JSX.Element => {
  const navigationItems = ['home', 'dashboard', 'new customer']
  const [hide, setHide] = useState(true)
  const handleHideNavigation = () => setHide((state) => !state)

  return (
    <>
      <nav className={`${hide ? 'hide' : ''}`} onMouseEnter={handleHideNavigation} onMouseLeave={handleHideNavigation}>
        <Menu items={navigationItems} hideElement={{ value: hide, setter: setHide }} />
      </nav>
      <Section Element={<Outlet />} />
    </>
  )
}
