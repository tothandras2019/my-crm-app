import './menu-component.css'
import { LinkButton } from '../../tools/button/link/link-button-component'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { HamburgerMenu } from '../../tools/menu/hamburger-menu/hamburger-menu-component'
import { mainMenuItemsIcon } from '../../../utility/menu-items/menu-items'

export const Menu = ({
  items,
  hideElement,
}: {
  items: string[]
  hideElement: { value: boolean; setter: Dispatch<SetStateAction<boolean>> }
}): JSX.Element => {
  const menItems = ['sales performance', 'success order', 'summary']
  // const positionDegree = 360 / menItems.length
  // const handleCloseMenu = () => {
  //   hideElement.setter((state) => !state)
  // }

  return (
    <div className={`menu-container ${hideElement.value ? 'close' : ''}`}>
      {Object.entries(mainMenuItemsIcon).map(([key, value], i) => {
        return <LinkButton key={`item--${i}`} value={key} hide={hideElement.value} IconSVGComponent={value} />
      })}
      <HamburgerMenu hideElementValue={hideElement.value} />
    </div>
  )
}
