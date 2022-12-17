import './link-button-component.css'
import { useNavigate } from 'react-router-dom'

export const LinkButton = ({
  value = 'empty',
  rotating,
  hide = false,
}: {
  value?: string | undefined
  rotating?: number
  hide?: boolean
}): JSX.Element => {
  const navigateTo = useNavigate()
  const handleNavigation = () => {
    const navTo = value === 'home' ? '/' : value
    navigateTo(navTo)
  }
  return (
    <div className={`menu-link ${hide ? 'hide' : ''}`} onClick={handleNavigation}>
      <p>{value}</p>
    </div>
  )
}
