import './table-component.css'

import { AccessType, AddressType, SocialType } from '../../../DATASTORE/data-types/main.data.types/customer-data-types'
import { TableHeader } from './table-header/table-header-component'
import { CustomButton } from '../../tools/button/submit/custom-button-component'
import { TableItems } from './table-items/table-items-component'

type TableDataType = { address: AddressType[]; access: AccessType[]; social: SocialType[] }
export const Table = ({ address, access, social }: TableDataType): JSX.Element => {
  const addressHeaderValues: string[] = ['primary', 'country', 'code', 'city', 'building', 'street', 'zip']
  const accessHeaderValues: string[] = ['primary', 'person', 'email', 'telephone']
  const socialHeaderValues: string[] = ['media', 'link']

  return (
    <div className='full-details'>
      <div>
        <TableHeader title={'Address'} headerValues={addressHeaderValues} />
        <div className='full-details-row'>
          {address.map((addressObject, index) => {
            const { primary, country, code, city, building, street, zip } = addressObject
            const dataArray = [primary, country, code, city, building, street, zip]
            return <TableItems key={`address_${index}`} dataArray={dataArray} />
          })}
        </div>
      </div>
      <div>
        <TableHeader title={'Access'} headerValues={accessHeaderValues} />
        <div className='full-details-row'>
          {access.map((addressObject, index) => {
            const { primary, person, email, telephone } = addressObject
            const dataArray = [primary, person, email, telephone]
            return <TableItems key={`access_${index}`} dataArray={dataArray} />
          })}
        </div>
      </div>
      <div>
        <TableHeader title={'Social'} headerValues={socialHeaderValues} />
        <div className='full-details-row'>
          {social.map((addressObject, index) => {
            const { media, link } = addressObject
            const dataArray = [media, link]
            return <TableItems key={`social_${index}`} dataArray={dataArray} />
          })}
        </div>
      </div>
    </div>
  )
}

//  primary: boolean
//  person: string
//  email: string
//  telephone: string
