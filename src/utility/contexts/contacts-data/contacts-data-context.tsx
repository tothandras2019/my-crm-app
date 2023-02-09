import { createContext, Dispatch, SetStateAction, useState } from 'react';
import { AccessType, AddressType, SocialType } from '../../../DATASTORE/data-types/main.data.types/customer-data-types';

export enum CHANGE_STATUS_ACTION {
  new = 'new',
  modifycation = 'modifycation',
  delete = 'delete',
}

export type InitTempAvailabilityDataType = {
  isScheduleOpen: boolean;
  scheduleDay: { year: string; month: string; day: string };
  isOpenRecordContract: boolean;
  isModification: boolean;
  openModifyUiData: boolean;
  customerId: string | undefined;
  changeStatus: CHANGE_STATUS_ACTION | undefined;
  access: { isAddNew: boolean; rowId: number | undefined; data: AccessType | undefined };
  address: { isAddNew: boolean; rowId: number | undefined; data: AddressType | undefined };
  social: { isAddNew: boolean; rowId: number | undefined; data: SocialType | undefined };
};

export const InitTempAvailabilityData: InitTempAvailabilityDataType = {
  isScheduleOpen: false,
  scheduleDay: { year: '', month: '', day: '' },
  isOpenRecordContract: false,
  isModification: true,
  openModifyUiData: false,
  customerId: undefined,
  changeStatus: undefined,
  access: { isAddNew: false, rowId: undefined, data: undefined },
  address: { isAddNew: false, rowId: undefined, data: undefined },
  social: { isAddNew: false, rowId: undefined, data: undefined },
};
type openModifyModalType = Dispatch<SetStateAction<InitTempAvailabilityDataType>>;

export const AvailabilityContext = createContext<{ openModifyModal: InitTempAvailabilityDataType; setOpenModifyModal: openModifyModalType }>({
  openModifyModal: InitTempAvailabilityData,
  setOpenModifyModal: () => {},
});

export const OpenModalContextProvider = ({ children }: { children: any }) => {
  const [openModifyModal, setOpenModifyModal] = useState<InitTempAvailabilityDataType>(InitTempAvailabilityData);

  return <AvailabilityContext.Provider value={{ openModifyModal, setOpenModifyModal }}>{children}</AvailabilityContext.Provider>;
};
