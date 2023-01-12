import './table-items-component .css'
import { CustomButton } from '../../../tools/button/submit/custom-button-component'
import { useContext, useEffect, useState } from 'react'
import {
  AvailabilityContext,
  CHANGE_STATUS_ACTION,
  InitTempAvailabilityDataType,
} from '../../../../utility/contexts/contacts-data/contacts-data-context'
import { AccessType, AddressType, SocialType } from '../../../../DATASTORE/data-types/main.data.types/customer-data-types'

export const TableItems = ({
  dataArray,
  dataObject,
  customerId,
  index,
  isNarrowColumn = false,
}: {
  dataArray: (string | number | boolean)[]
  dataObject: AddressType | AccessType | SocialType
  customerId: string
  index: number
  isNarrowColumn?: boolean
}): JSX.Element => {
  const { setOpenModifyModal } = useContext(AvailabilityContext)

  const handleModification = () => {
    if ('country' in dataObject) {
      setOpenModifyModal((state) => ({
        ...state,
        customerId: customerId,
        openModifyUiData: true,
        changeStatus: CHANGE_STATUS_ACTION.modifycation,
        address: { ...state.address, rowId: index, data: dataObject },
      }))
    }
    if ('person' in dataObject) {
      setOpenModifyModal((state) => ({
        ...state,
        customerId: customerId,
        openModifyUiData: true,
        changeStatus: CHANGE_STATUS_ACTION.modifycation,
        access: { ...state.access, rowId: index, data: dataObject },
      }))
    }
    if ('media' in dataObject) {
      setOpenModifyModal((state) => ({
        ...state,
        customerId: customerId,
        openModifyUiData: true,
        changeStatus: CHANGE_STATUS_ACTION.modifycation,
        social: { ...state.social, rowId: index, data: dataObject },
      }))
    }
  }

  const deleteLine = () => {
    if ('country' in dataObject) {
      setOpenModifyModal((state) => ({
        ...state,
        customerId: customerId,
        openModifyUiData: true,
        changeStatus: CHANGE_STATUS_ACTION.delete,
        address: { ...state.address, rowId: index, data: dataObject },
      }))
    }
    if ('person' in dataObject) {
      setOpenModifyModal((state) => ({
        ...state,
        customerId: customerId,
        openModifyUiData: true,
        changeStatus: CHANGE_STATUS_ACTION.delete,
        access: { ...state.access, rowId: index, data: dataObject },
      }))
    }
    if ('media' in dataObject) {
      setOpenModifyModal((state) => ({
        ...state,
        customerId: customerId,
        openModifyUiData: true,
        changeStatus: CHANGE_STATUS_ACTION.delete,
        social: { ...state.social, rowId: index, data: dataObject },
      }))
    }
  }

  return (
    <div className='full-details-items'>
      <div className={`full-details-title-row ${isNarrowColumn ? 'narrow' : ''} row-id-${index}`}>
        {dataArray.map((data, index) => (
          <p key={`${data}_${index}`}>{data.toString()}</p>
        ))}
      </div>
      <CustomButton color={'yellow'} value={'modify'} handler={handleModification} />
      <CustomButton color={'red'} value={'delete'} handler={deleteLine} />
    </div>
  )
}
