import './table-items-component .css'
import { CustomButton } from '../../../tools/button/submit/custom-button-component'
import { useContext, useEffect, useState } from 'react'
import { OpenModalContext, OpenModalType } from '../../../../utility/contexts/contacts-data/contacts-data-context'
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
  const { setOpenModifyModal } = useContext(OpenModalContext)

  const handleModification = () => {
    let key: string = 'socialData'
    if ('country' in dataObject) {
      key = 'addressData'
      setOpenModifyModal((state) => ({
        ...state,
        customerId: customerId,
        openModifyUiData: true,
        addressData: { ...state.addressData, rowId: index, data: dataObject },
      }))
    }
    if ('person' in dataObject) {
      key = 'accessData'
      setOpenModifyModal((state) => ({
        ...state,
        customerId: customerId,
        openModifyUiData: true,
        accessData: { ...state.accessData, rowId: index, data: dataObject },
      }))
    }
    if ('media' in dataObject) {
      key = 'socialData'
      setOpenModifyModal((state) => ({
        ...state,
        customerId: customerId,
        openModifyUiData: true,
        socialData: { ...state.socialData, rowId: index, data: dataObject },
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
    </div>
  )
}
