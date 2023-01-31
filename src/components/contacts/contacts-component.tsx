import './contacts-component.css'
import { CustomerDataType } from '../../DATASTORE/data-types/main.data.types/customer-data-types'
import { CustomButton } from './../tools/button/submit/custom-button-component'
import { FormEvent, MutableRefObject, useContext, useEffect, useRef, useState } from 'react'
import { MainContext } from '../../utility/contexts/main.context'
import { deleteCustomer } from '../../DATASTORE/data-types/man.data.reducers/customer-reducer/customer.data.actions'
import { OtherActionContexts } from '../../utility/contexts/action.context'
import { Table } from '../main/table/table-component'
import { Input } from '../tools/input/input-component'
import { SearchSvg } from '../../icons/sub-menu/svg-icons-components'
import { SearchInput } from '../tools/search-input/search-input-component'
import { CotactDetails } from './contact-details/contact-details-component'
import { HeaderTitleColumn } from '../header-title-column/header-title-column-component'
import { AvailabilityContext } from '../../utility/contexts/contacts-data/contacts-data-context'

export const Contacts = ({ customersData }: { customersData: Required<CustomerDataType>[] }): JSX.Element => {
  const [headerItem, SetHeaderItem] = useState<string[]>(['Id', 'Company', 'Person', 'Telephone', 'Email'])

  const searchValue = useRef<HTMLInputElement | null>(null)
  const { path, SetOpen_Manager } = useContext(OtherActionContexts)
  const { setOpenModifyModal } = useContext(AvailabilityContext)
  const [templateCustomerData, setTemplateCustomerData] = useState<CustomerDataType[] | []>([])
  const [filteredCustomerData, setFilteredCustomerData] = useState<CustomerDataType[] | []>([])

  const { customers } = useContext(MainContext)
  const { CustomerDispatch } = customers

  const [isOpenDetails, setIsOpenDetails] = useState<boolean[]>([])

  useEffect(() => {
    customersData.forEach((customer) => setIsOpenDetails((state) => [...state, false]))
    setTemplateCustomerData(customersData)
  }, [customersData])

  const handleOpenDetails = (event: FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    const id = parseInt(target.id)
    const newDetailsShowArray = isOpenDetails.map((detail, index) => (index === id ? !detail : detail))
    setIsOpenDetails(newDetailsShowArray)
  }

  const handleDelete = (event: FormEvent<HTMLDivElement>) => {
    const target = event.target as HTMLInputElement
    const customerId = target.id
    CustomerDispatch(deleteCustomer(customerId))
  }

  const handleModification = (customer: CustomerDataType) => {
    SetOpen_Manager((state) => ({ ...state, customerForModify: { customer: customer } }))
  }

  const handle_NewContact = () => {
    // setOpenModifyModal((state) => ({
    //   ...state,
    //   openModifyUiData: true,
    //   access: { ...state.access, isAddNew: true },
    //   address: { ...state.address, isAddNew: true },
    //   social: { ...state.social, isAddNew: true },
    // }))

    console.log(path.currentPath)
    SetOpen_Manager((prevState) => ({ ...prevState, [path.currentPath]: true }))
  }

  const handleSubmitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const current = searchValue.current

    if (!current) return
    const value = current.value
    const filtered = templateCustomerData.filter((customer) => customer.companyName.toLocaleLowerCase().includes(value))
    setFilteredCustomerData(filtered)

    //reset search field:
    current.value = ''
  }

  const handleResetSearch = () => {
    const current = searchValue.current
    setFilteredCustomerData([])
    if (current) current.value = ''
  }

  return (
    <div className='contacts-container'>
      <HeaderTitleColumn
        button_title='new contact'
        headerItem={headerItem}
        submit_Search={handleSubmitSearch}
        reset={handleResetSearch}
        useRef={searchValue}
        handleNewItem={handle_NewContact}
      />

      {filteredCustomerData.length > 0
        ? filteredCustomerData.map((customer, index) => {
            const { id, companyName, address, access, social, status } = customer
            return (
              <CotactDetails
                key={`${id}_${index}`}
                customer={customer}
                isOpen={isOpenDetails[index]}
                index={index}
                handleOpenDetails={handleOpenDetails}
              />
            )
          })
        : customersData.map((customer, index) => {
            const { id, companyName, address, access, social, status } = customer
            return (
              <CotactDetails
                key={`${id}_${index}`}
                customer={customer}
                isOpen={isOpenDetails[index]}
                index={index}
                handleOpenDetails={handleOpenDetails}
              />
            )
          })}
    </div>
  )
}
