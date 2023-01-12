import { FormEvent } from 'react'
import { CustomerDataType } from '../../../DATASTORE/data-types/main.data.types/customer-data-types'
import { Table } from '../../main/table/table-component'
import { CustomButton } from '../../tools/button/submit/custom-button-component'

export const CotactDetails = ({
  customer,
  isOpen,
  index,
  handleOpenDetails,
}: {
  customer: CustomerDataType
  isOpen: boolean
  index: number
  handleOpenDetails: (event: FormEvent<HTMLInputElement>) => void
}): JSX.Element => {
  const { id, companyName, address, access, social, status } = customer

  return (
    <div id={id} className='contact-details'>
      <div className='main-details'>
        <div className='main-details-header'>
          <p>{id}</p>
          <p>{companyName}</p>
          <p>{access[0].person}</p>
          <p>{access[0].telephone}</p>
          <p>{access[0].email}</p>
        </div>
        <CustomButton color={'blue'} value='details' id={index} handler={handleOpenDetails} />
      </div>
      {isOpen && <Table address={address} access={access} social={social} customerId={id} />}
    </div>
  )
}
