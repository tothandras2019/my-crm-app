import './section-action-header.css'
import { useContext } from 'react'
import { PathContext } from '../../../utility/contexts/action.context'
export const SectionActionHeader = (): JSX.Element => {
  const { path, SetMenuManagerOpenOption } = useContext(PathContext)
  return (
    <header>
      <h4>{path.currentPath}</h4>
    </header>
  )
}
