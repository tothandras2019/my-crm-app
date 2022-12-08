import './rotating-menu-component.css'
import { LinkButton } from '../../tools/button/link/link-button-component'
import { useEffect } from 'react'

export const RotatingMenu = (): JSX.Element => {
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
  useEffect(() => {}, [menItems])
  return (
    <div className='rotating-container'>
      {menItems.map((item, i) => (
        <LinkButton key={`item--${i}`} value={item} rotating={positionDegree * i} />
      ))}
    </div>
  )
}
