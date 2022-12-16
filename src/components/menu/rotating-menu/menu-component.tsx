import './menu-component.css'
import { LinkButton } from '../../tools/button/link/link-button-component'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { HamburgerMenu } from '../../tools/menu/hamburger-menu/hamburger-menu-component'

export const Menu = ({
  items,
  hideElement,
}: {
  items: string[]
  hideElement: { value: boolean; setter: Dispatch<SetStateAction<boolean>> }
}): JSX.Element => {
  const menItems = ['sales performance', 'success order', 'summary']
  const positionDegree = 360 / menItems.length
  const handleCloseMenu = () => {
    hideElement.setter((state) => !state)
  }

  useEffect(() => {}, [menItems])
  return (
    <div className={`menu-container ${hideElement.value ? 'close' : ''}`}>
      {items.map((item, i) => (
        <LinkButton key={`item--${i}`} value={item} rotating={positionDegree * i} hide={hideElement.value} />
      ))}
      <HamburgerMenu handler={handleCloseMenu} />
    </div>
  )
}
