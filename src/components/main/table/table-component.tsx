import './table-component.css'

import { AccessType, AddressType, SocialType } from '../../../DATASTORE/data-types/main.data.types/customer-data-types'
import { TableHeader } from './table-header/table-header-component'
import { CustomButton } from '../../tools/button/submit/custom-button-component'
import { TableItems } from './table-items/table-items-component'
import { useContext } from 'react'
import { AvailabilityContext } from '../../../utility/contexts/contacts-data/contacts-data-context'

type TableType = { address: AddressType[]; access: AccessType[]; social: SocialType[]; customerId: string }
export const Table = ({ address, access, social, customerId }: TableType): JSX.Element => {
  const { openModifyModal, setOpenModifyModal } = useContext(AvailabilityContext)
  const { isModification } = openModifyModal

  const addressHeaderValues: string[] = ['primary', 'country', 'code', 'city', 'building', 'street', 'zip']
  const accessHeaderValues: string[] = ['primary', 'person', 'email', 'telephone']
  const socialHeaderValues: string[] = ['media', 'link']

  const handleNewAddress = () => {
    setOpenModifyModal((state) => ({
      ...state,
      customerId: customerId,
      isModification: false,
      address: { ...state.address, isAddNew: true },
    }))
  }
  const handleNewAccess = () => {
    setOpenModifyModal((state) => ({
      ...state,
      customerId: customerId,
      isModification: false,
      access: { ...state.access, isAddNew: true },
    }))
  }
  const handleNewsocial = () => {
    setOpenModifyModal((state) => ({
      ...state,
      customerId: customerId,
      isModification: false,
      social: { ...state.social, isAddNew: true },
    }))
  }

  return (
    <div className='full-details'>
      <fieldset className='full-details-container'>
        <legend>{'Address'}</legend>
        <TableHeader title={'Address'} headerValues={addressHeaderValues} handler={handleNewAddress} isNarrowColumn={true} />
        <div className='full-details-row'>
          {address.map((addressObject, index) => {
            const { primary, country, code, city, building, street, zip } = addressObject
            const dataArray = [primary, country, code, city, building, street, zip] //strict order!
            return (
              <TableItems
                key={`address_${index}`}
                index={index}
                dataArray={dataArray}
                dataObject={addressObject}
                customerId={customerId}
                isNarrowColumn={true}
              />
            )
          })}
        </div>
      </fieldset>
      <fieldset className='full-details-container'>
        <legend>Access</legend>
        <TableHeader title={'Access'} headerValues={accessHeaderValues} handler={handleNewAccess} />
        <div className='full-details-row'>
          {access.map((addressObject, index) => {
            const { primary, person, email, telephone } = addressObject
            const dataArray = [primary, person, email, telephone] //strict order!
            return <TableItems key={`access_${index}`} index={index} dataArray={dataArray} dataObject={addressObject} customerId={customerId} />
          })}
        </div>
      </fieldset>
      <fieldset className='full-details-container'>
        <legend>Social</legend>
        <TableHeader title={'Social'} headerValues={socialHeaderValues} handler={handleNewsocial} />
        <div className='full-details-row'>
          {social.map((addressObject, index) => {
            const { media, link } = addressObject
            const dataArray = [media, link] //strict order!
            return <TableItems key={`social_${index}`} index={index} dataArray={dataArray} dataObject={addressObject} customerId={customerId} />
          })}
        </div>
      </fieldset>
    </div>
  )
}
