import './table-items-component .css'
import { CustomButton } from '../../../tools/button/submit/custom-button-component'
import { useContext, useEffect } from 'react'
import { OpenModalContext, OpenModalType } from '../../../../utility/contexts/contacts-data-modification/manage.modifications.context'
import { AccessType, AddressType, SocialType } from '../../../../DATASTORE/data-types/main.data.types/customer-data-types'

export const TableItems = ({
  dataArray,
  dataObject,
  customerId,
  index,
}: {
  dataArray: (string | number | boolean)[]
  dataObject: AddressType | AccessType | SocialType
  customerId: string
  index: number
}): JSX.Element => {
  const { setOpenModifyModal } = useContext(OpenModalContext)

  const handleModification = () => {
    let key: string = 'socialData'
    if ('country' in dataObject) {
      key = 'addressData'
    }
    if ('person' in dataObject) {
      key = 'accessData'
    }
    if ('media' in dataObject) {
      key = 'socialData'
    }

    console.log(`[handleModification]`, key)
    setOpenModifyModal((state) => ({ ...state, customerId: customerId, openModifyUiData: true, [key]: { rowId: index, data: dataObject } }))
  }
  return (
    <div className='full-details-items'>
      <div className={`full-details-title-row row-id-${index}`}>
        {dataArray.map((data, index) => (
          <p key={`${data}_${index}`}>{data}</p>
        ))}
      </div>
      <CustomButton color={'yellow'} value={'modify'} handler={handleModification} />
    </div>
  )
}
