import { MainContext } from './main.context'
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'

type InitManagerMenuOptionsType = {
  contacts: boolean
  dashboard: boolean
  calendar: boolean
  settings: boolean
}
export const InitManagerMenuOptions = {
  contacts: false,
  dashboard: false,
  calendar: false,
  settings: false,
}

type SetPathType = { [key: string]: string }
export const SectionActions: SetPathType = {
  currentPath: '',
}

type SetPathDispatchType = Dispatch<SetStateAction<SetPathType>>
type SetButtonValueDispatchType = Dispatch<SetStateAction<InitManagerMenuOptionsType>>
type ContextType = {
  path: SetPathType
  setPath: SetPathDispatchType
  MenuManagerOpenOption: InitManagerMenuOptionsType
  SetMenuManagerOpenOption: SetButtonValueDispatchType
}
export const PathContext = createContext<ContextType>({
  path: SectionActions,
  setPath: () => {},
  MenuManagerOpenOption: InitManagerMenuOptions,
  SetMenuManagerOpenOption: () => {},
})

export const PathContextProvider = ({ children }: { children: any }) => {
  const [path, setPath] = useState(SectionActions)
  const [MenuManagerOpenOption, SetMenuManagerOpenOption] = useState<InitManagerMenuOptionsType>(InitManagerMenuOptions)

  return <PathContext.Provider value={{ path, setPath, MenuManagerOpenOption, SetMenuManagerOpenOption }}> {children}</PathContext.Provider>
}
