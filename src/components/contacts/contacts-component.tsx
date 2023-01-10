import './contacts-component.css'
import { CustomerDataType } from '../../DATASTORE/data-types/main.data.types/customer-data-types'
import { CustomButton } from './../tools/button/submit/custom-button-component'
import { FormEvent, useContext, useEffect, useRef, useState } from 'react'
import { MainContext } from '../../utility/contexts/main.context'
import { deleteCustomer } from '../../DATASTORE/data-types/man.data.reducers/customer-reducer/customer.data.actions'
import { PathContext } from '../../utility/contexts/action.context'
import { Table } from '../main/table/table-component'

export const Contacts = ({ customersData }: { customersData: Required<CustomerDataType>[] }): JSX.Element => {
  const { path, SetMenuManagerOpenOption } = useContext(PathContext)

  const { customers } = useContext(MainContext)
  const { CustomerDispatch } = customers

  const [isOpenDetailsObject, setIsOpenDetailsObject] = useState<boolean[]>([])

  useEffect(() => {
    customersData.forEach((customer) => setIsOpenDetailsObject((state) => [...state, false]))
  }, [customersData])

  const handleOpenDetails = (event: FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    const id = parseInt(target.id)
    const newDetailsShowArray = isOpenDetailsObject.map((detail, index) => (index === id ? !detail : detail))
    setIsOpenDetailsObject(newDetailsShowArray)
  }

  const handleDelete = (event: FormEvent<HTMLDivElement>) => {
    const target = event.target as HTMLInputElement
    const customerId = target.id
    CustomerDispatch(deleteCustomer(customerId))
  }

  const handleModification = (customer: CustomerDataType) =>
    SetMenuManagerOpenOption((state) => ({ ...state, customerForModify: { customer: customer } }))

  const handleManagerOption = () => SetMenuManagerOpenOption((prevState) => ({ ...prevState, [path.currentPath]: true }))

  return (
    <div className='contacts-container'>
      <div className='header-details'>
        <div className='header-details-column'>
          <p>{'Id'}</p>
          <p>{'Company'}</p>
          <p>{'Person'}</p>
          <p>{'Telephone'}</p>
          <p>{'Email'}</p>
        </div>
        <input type='text' placeholder='search (under construct)' />
        <CustomButton color={'green'} value={'new contact'} handler={handleManagerOption} />
      </div>
      {customersData.map((customer, index) => {
        const { id, companyName, address, access, social, status } = customer

        return (
          <div id={id} key={`${id}_${index}`} className='contact-details'>
            <div className='main-details'>
              <div className='main-details-header'>
                <p>{id}</p>
                <p>{companyName}</p>
                <p>{access[0].person}</p>
                <p>{access[0].telephone}</p>
                <p>{access[0].email}</p>
              </div>
              <CustomButton value='details' id={index} handler={handleOpenDetails} />
            </div>
            {isOpenDetailsObject[index] && <Table address={address} access={access} social={social} customerId={id} />}
          </div>
        )
      })}
    </div>
  )
}
