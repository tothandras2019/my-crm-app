import { useContext, useEffect, useState } from 'react'
import { OpenCloseButton } from '../../tools/button/open-close/open-close-button-component'
import { PathContext } from '../../../utility/contexts/action.context'
import './section-action-header.css'
import { MainContext } from '../../../utility/contexts/main.context'
type buttonOptionsType = { title: string; action: () => void }
type managerOptionsType = {
  isContact_ManagersOpen: boolean
  isContracts_ManagersOpen: boolean
  isCalendar_ManagersOpen: boolean
  isSettings_ManagersOpen: boolean
}
export const SectionActionHeader = (): JSX.Element => {
  const { path } = useContext(PathContext)
  const { customers } = useContext(MainContext)
  const { CustomerDispatch } = customers

  const InitManagerOptionsType = {
    isContact_ManagersOpen: false,
    isContracts_ManagersOpen: false,
    isCalendar_ManagersOpen: false,
    isSettings_ManagersOpen: false,
  }

  const [buttonValue, setButtonValue] = useState<managerOptionsType>(InitManagerOptionsType)

  const [sectionMenuOptions, setSectionMenuOptions] = useState({
    add: () => {},
    modify: () => {},
    delete: () => {},
  })
  useEffect(() => {
    console.log(path)
    switch (path.currentPath) {
      case 'home': {
        setButtonValue(InitManagerOptionsType)
        break
      }
      case 'dashboard': {
        break
      }
      case 'contacts': {
        setButtonValue((state) => ({ ...state, isContact_ManagersOpen: true }))
        break
      }
      case 'calendar': {
        break
      }
      case 'settings': {
        break
      }
    }
  }, [path])

  return <>{buttonValue.isContact_ManagersOpen && <header>{<OpenCloseButton changeValue={'contacts manager'} handler={() => {}} />}</header>}</>
}
