import './section-action-header.css'
import { useContext, useEffect } from 'react'
import { OpenCloseButton } from '../../tools/button/open-close/open-close-button-component'
import { InitManagerMenuOptions, PathContext } from '../../../utility/contexts/action.context'
export const SectionActionHeader = (): JSX.Element => {
  const { path, SetMenuManagerOpenOption } = useContext(PathContext)
  const handleManagerOption = () => SetMenuManagerOpenOption((prevState) => ({ ...prevState, [path.currentPath]: true }))

  useEffect(() => {
    return () => SetMenuManagerOpenOption(InitManagerMenuOptions)
  }, [path.currentPath])

  return (
    <header>
      {<OpenCloseButton pageTextValue={`Manage ${path.currentPath.length <= 0 ? 'home' : path.currentPath}`} handler={handleManagerOption} />}
    </header>
  )
}
