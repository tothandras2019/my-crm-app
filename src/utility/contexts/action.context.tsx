import { MainContext } from './main.context'
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'

type SetPathType = { [key: string]: string }

export const SectionActions: SetPathType = {
  currentPath: '',
}

type SetPathDispatchType = Dispatch<SetStateAction<SetPathType>>
export const PathContext = createContext<{ path: SetPathType; setPath: SetPathDispatchType }>({ path: SectionActions, setPath: () => {} })

export const PathContextProvider = ({ children }: { children: any }) => {
  const [path, setPath] = useState(SectionActions)

  return <PathContext.Provider value={{ path, setPath }}>{children}</PathContext.Provider>
}
