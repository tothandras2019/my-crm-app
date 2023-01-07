import './contacts-component.css'
import { CustomerDataType } from '../../DATASTORE/data-types/main.data.types/customer-data-types'
import { CustomButton } from './../tools/button/submit/custom-button-component'
import { FormEvent, useContext, useRef, useState } from 'react'
import { MainContext } from '../../utility/contexts/main.context'
import { deleteCustomer } from '../../DATASTORE/data-types/man.data.reducers/customer-reducer/customer.data.actions'
import { PathContext } from '../../utility/contexts/action.context'
import { Table } from '../main/table/table-component'

export const Contacts = ({ customersData }: { customersData: Required<CustomerDataType>[] }): JSX.Element => {
  const { SetMenuManagerOpenOption } = useContext(PathContext)

  const { customers } = useContext(MainContext)
  const { CustomerDispatch } = customers

  const [isOpenDetails, setIsOpenDetails] = useState(false)
  const handleOpenDetails = () => setIsOpenDetails((state) => !state)

  const handleDelete = (event: FormEvent<HTMLDivElement>) => {
    const target = event.target as HTMLInputElement
    const customerId = target.id
    CustomerDispatch(deleteCustomer(customerId))
  }

  const handleModification = (customer: CustomerDataType) =>
    SetMenuManagerOpenOption((state) => ({ ...state, customerForModify: { customer: customer } }))

  return (
    <div className='contacts-container'>
      <div className='header-details'>
        <p>{'id'}</p>
        <p>{'companyName'}</p>
        <p>{'person'}</p>
        <p>{'telephone'}</p>
        <p>{'email'}</p>
      </div>
      {customersData.map((customer, i) => {
        const { id, companyName, address, access, social, status } = customer

        return (
          <div id={id} key={`${id}_${i}`} className='contact-details'>
            <div className='main-details'>
              <p>{id}</p>
              <p>{companyName}</p>
              <p>{access[0].person}</p>
              <p>{access[0].telephone}</p>
              <p>{access[0].email}</p>
              <p>
                <CustomButton value='details' handler={handleOpenDetails} />
              </p>
            </div>
            {isOpenDetails && <Table address={address} access={access} social={social} />}
          </div>
        )
      })}
    </div>
  )
}

// <div id={id} key={`${id}_${i}`} className='contact-details'>
//   <p>id: {id}</p>
//   <div className='delete-button_absolute'>
//     <CustomButton value='modify' type='button' id={id} handler={() => handleModification(customer)} />
//     <CustomButton value='delete' type='button' id={id} handler={handleDelete} />
//   </div>
//   <h1>{companyName}</h1>
//   <div>
//     <ul>
//       {access.map(({ primary, person, email, telephone }, access_index) => (
//         <li key={`${access_index}`}>
//           <h4>{primary ? 'primary' : 'secondary'}</h4>
//           <p>contact:{person}</p>
//           <p>e-mail:{email}</p>
//           <p>tel: {telephone ? telephone : 'not registered'}</p>
//         </li>
//       ))}
//     </ul>
//   </div>
// </div>
