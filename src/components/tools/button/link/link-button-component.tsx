import './link-button-component.css'
import { useNavigate } from 'react-router-dom'
import { ReactNode, useContext } from 'react'
import { OtherActionContexts } from './../../../../utility/contexts/action.context'

type LinkButtonType = { value: string; hide: boolean; IconSVGComponent: () => JSX.Element | undefined }
export const LinkButton = ({ value = '', hide = false, IconSVGComponent }: Partial<LinkButtonType>): JSX.Element => {
  const { setPath } = useContext(OtherActionContexts)
  const navigateTo = useNavigate()

  const handleNavigation = () => {
    const navTo = value === 'home' ? '/' : value
    navigateTo(navTo)
    setPath(() => ({ currentPath: value }))
  }
  return (
    <div className={`menu-link ${hide ? 'hide' : ''}`} onClick={handleNavigation}>
      {IconSVGComponent && IconSVGComponent()}
      <p>{value}</p>
    </div>
  )
}
