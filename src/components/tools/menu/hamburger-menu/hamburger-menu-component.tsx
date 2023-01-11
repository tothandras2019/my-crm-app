import './hamburger-menu-component.css'
import { FormEvent, SyntheticEvent, useState } from 'react'

type HamburgerMenuType = { hideElementValue: boolean }
export const HamburgerMenu = ({ hideElementValue }: HamburgerMenuType) => {
  return (
    <div className={`menu-button ${hideElementValue ? '' : 'close'}`}>
      <span></span>
    </div>
  )
}
