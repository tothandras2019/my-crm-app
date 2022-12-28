import './link-button-component.css'
import { useNavigate } from 'react-router-dom'
import { ReactNode } from 'react'

type LinkButtonType = { value: string | undefined; hide: boolean; IconSVGComponent: () => JSX.Element | undefined }
export const LinkButton = ({ value = 'empty', hide = false, IconSVGComponent }: Partial<LinkButtonType>): JSX.Element => {
  const navigateTo = useNavigate()
  const handleNavigation = () => {
    const navTo = value === 'home' ? '/' : value
    navigateTo(navTo)
  }
  return (
    <div className={`menu-link ${hide ? 'hide' : ''}`} onClick={handleNavigation}>
      {IconSVGComponent && IconSVGComponent()}
      <p>{value}</p>
    </div>
  )
}
