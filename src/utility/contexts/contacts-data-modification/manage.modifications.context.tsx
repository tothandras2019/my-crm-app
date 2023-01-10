import { createContext, Dispatch, SetStateAction, useState } from 'react'
import { AccessType, AddressType, SocialType } from '../../../DATASTORE/data-types/main.data.types/customer-data-types'

export {}

export type OpenModalType = {
  isModification: boolean
  openModifyUiData: boolean
  customerId: string | undefined
  accessData: { rowId: number | undefined; data: AccessType | undefined }
  addressData: { rowId: number | undefined; data: AddressType | undefined }
  socialData: { rowId: number | undefined; data: SocialType | undefined }
}

export const InitOpenModal: OpenModalType = {
  isModification: true,
  openModifyUiData: false,
  customerId: undefined,
  accessData: { rowId: undefined, data: undefined },
  addressData: { rowId: undefined, data: undefined },
  socialData: { rowId: undefined, data: undefined },
}
type openModifyModalType = Dispatch<SetStateAction<OpenModalType>>

export const OpenModalContext = createContext<{ openModifyModal: OpenModalType; setOpenModifyModal: openModifyModalType }>({
  openModifyModal: InitOpenModal,
  setOpenModifyModal: () => {},
})

export const OpenModalContextProvider = ({ children }: { children: any }) => {
  const [openModifyModal, setOpenModifyModal] = useState<OpenModalType>(InitOpenModal)

  return <OpenModalContext.Provider value={{ openModifyModal, setOpenModifyModal }}>{children}</OpenModalContext.Provider>
}
