import './hamburger-menu-component.css'
import { FormEvent, SyntheticEvent, useState } from 'react'

type HamburgerMenuType = { hideElementValue: boolean; handler: () => void }
export const HamburgerMenu = ({ hideElementValue, handler }: HamburgerMenuType) => {
  return (
    <div className={`menu-button ${hideElementValue ? '' : 'close'}`}>
      <span></span>
    </div>
  )
}
