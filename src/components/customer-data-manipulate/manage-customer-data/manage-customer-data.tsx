import './manage-customer-data.css'
import { AccessType, AddressType, CustomerDataType, SocialType } from '../../../DATASTORE/data-types/main.data.types/customer-data-types'
import { FormEvent, useContext } from 'react'
import { InitTempAvailabilityData, AvailabilityContext, CHANGE_STATUS_ACTION } from '../../../utility/contexts/contacts-data/contacts-data-context'
import { MainContext } from '../../../utility/contexts/main.context'
import { modifyCustomer } from '../../../DATASTORE/data-types/man.data.reducers/customer-reducer/customer.data.actions'
import { Modify_Contacts_Form } from '../../forms/mofify-contacts-form-component'

export const Manage_Customer = (): JSX.Element => {
  const { openModifyModal, setOpenModifyModal } = useContext(AvailabilityContext)
  const { customers } = useContext(MainContext)
  const { customerState, CustomerDispatch } = customers

  const { isModification, address: addressData, social: socialData, access: accessData } = openModifyModal

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const target = event.target as HTMLInputElement
    const valuesArray: string[] = []
    Object.values(target).forEach((input, index) => input instanceof HTMLInputElement && input.type === 'text' && valuesArray.push(input.value))
    isModification
      ? changeExisting_CustomerData(getDataObject(valuesArray), matchFoundCustomerAndKey)
      : addNew_CustomerData(getDataObject(valuesArray), matchFoundCustomerAndKey)
  }

  const matchFoundCustomerAndKey = () => {
    const foundCustomer: CustomerDataType | undefined = customerState.find((customer) => customer.id === openModifyModal.customerId)

    let key: string | undefined = undefined

    if (addressData.data || addressData.isAddNew) key = 'address'
    if (accessData.data || accessData.isAddNew) key = 'access'
    if (socialData.data || socialData.isAddNew) key = 'social'

    return { key: key, foundCustomer: foundCustomer }
  }

  const addNew_CustomerData = (
    modifiedObject: AddressType | AccessType | SocialType | null | undefined,
    FoundCustomerCallBack: () => { key: string | undefined; foundCustomer: CustomerDataType | undefined } | undefined,
  ) => {
    const { key, foundCustomer } = FoundCustomerCallBack() as { key: string; foundCustomer: CustomerDataType | undefined }
    if (!key || !foundCustomer) return

    let modCustomer: CustomerDataType | undefined = undefined
    if (key && foundCustomer) {
      if (key === 'address') modCustomer = { ...foundCustomer, [key]: [...foundCustomer[key], modifiedObject as AddressType] }
      if (key === 'access') modCustomer = { ...foundCustomer, [key]: [...foundCustomer[key], modifiedObject as AccessType] }
      if (key === 'social') modCustomer = { ...foundCustomer, [key]: [...foundCustomer[key], modifiedObject as SocialType] }
    }
    modCustomer && CustomerDispatch(modifyCustomer(modCustomer))
  }

  const changeExisting_CustomerData = (
    modifiedObject: AddressType | SocialType | AccessType | null | undefined,
    FoundCustomerCallBack: () => { key: string | undefined; foundCustomer: CustomerDataType | undefined },
  ) => {
    const { key, foundCustomer } = FoundCustomerCallBack() as { key: string; foundCustomer: CustomerDataType | undefined }
    let modCustomer: CustomerDataType | undefined = undefined
    if (!key || !foundCustomer) return

    if (openModifyModal.changeStatus === CHANGE_STATUS_ACTION.modifycation) {
      if (key === 'address')
        modCustomer = {
          ...foundCustomer,
          [key]: foundCustomer[key].map((data, index) => (index === openModifyModal[key].rowId ? (modifiedObject as AddressType) : data)),
        }

      if (key === 'access')
        modCustomer = {
          ...foundCustomer,
          [key]: foundCustomer[key].map((data, index) => (index === openModifyModal[key].rowId ? (modifiedObject as AccessType) : data)),
        }

      if (key === 'social')
        modCustomer = {
          ...foundCustomer,
          [key]: foundCustomer[key].map((data, index) => (index === openModifyModal[key].rowId ? (modifiedObject as SocialType) : data)),
        }
    }

    if (openModifyModal.changeStatus === CHANGE_STATUS_ACTION.delete) {
      if (key === 'address')
        modCustomer = { ...foundCustomer, [key]: foundCustomer[key].filter((data, index) => index !== openModifyModal[key].rowId) }

      if (key === 'access')
        modCustomer = { ...foundCustomer, [key]: foundCustomer[key].filter((data, index) => index !== openModifyModal[key].rowId) }

      if (key === 'social')
        modCustomer = { ...foundCustomer, [key]: foundCustomer[key].filter((data, index) => index !== openModifyModal[key].rowId) }
    }

    modCustomer && CustomerDispatch(modifyCustomer(modCustomer))
  }

  const getDataObject = (object: string[]): AddressType | AccessType | SocialType | null | undefined => {
    let result: AddressType | AccessType | SocialType | null = null
    if (addressData.data || addressData.isAddNew) {
      const [country, code, city, building, street, zip] = object
      return {
        primary: addressData.data?.primary ? true : false,
        country: country,
        code: code,
        city: city,
        building: parseInt(building),
        street: street,
        zip: zip,
      }
    }

    if (socialData.data || socialData.isAddNew) {
      const [media, link] = object
      return {
        media: media,
        link: link,
      }
    }

    if (accessData.data || accessData.isAddNew) {
      const [person, email, telephone] = object
      return {
        primary: accessData.data?.primary ? true : false,
        person: person,
        email: email,
        telephone: telephone,
      }
    }
  }

  const handleCancel = () => {
    setOpenModifyModal(InitTempAvailabilityData)
  }

  return <Modify_Contacts_Form submitHandler={handleSubmit} handleCancel={handleCancel} />
}
