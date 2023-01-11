import './modify-all-customer-data.css'
import { AccessType, AddressType, CustomerDataType, SocialType } from '../../../DATASTORE/data-types/main.data.types/customer-data-types'
import { Input } from '../../input/input-component'
import { CustomButton } from '../../tools/button/submit/custom-button-component'
import { Addresses } from '../addresses/addresses-component'
import { FormEvent, useContext, useEffect, useState } from 'react'
import { InitOpenModal, OpenModalContext } from '../../../utility/contexts/contacts-data-modification/manage.modifications.context'
import { MainContext } from '../../../utility/contexts/main.context'
import { modifyCustomer, addCustomer } from '../../../DATASTORE/data-types/man.data.reducers/customer-reducer/customer.data.actions'
import { ModifyForm } from '../../forms/availability-form-component'

export const ManageCustomerData = (): JSX.Element => {
  const { openModifyModal, setOpenModifyModal } = useContext(OpenModalContext)
  const { customers } = useContext(MainContext)
  const { customerState, CustomerDispatch } = customers

  const { isModification, addressData, socialData, accessData } = openModifyModal

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const target = event.target as HTMLInputElement
    const valuesArray: string[] = []
    Object.values(target).forEach((input, index) => input instanceof HTMLInputElement && input.type === 'text' && valuesArray.push(input.value))

    isModification
      ? modifyExisting_CustomerData(getDataObject(valuesArray), matchFoundCustomerAndKey)
      : addNew_CustomerData(getDataObject(valuesArray), matchFoundCustomerAndKey)
    // : addNew_CustomerData(getNew_DataObject(valuesArray), matchFoundCustomerAndKey)
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

    let modCustomer: CustomerDataType | undefined = undefined
    if (key && foundCustomer) {
      if (key === 'address') {
        modCustomer = {
          ...foundCustomer,
          [key]: [...foundCustomer[key], modifiedObject as AddressType],
        }
      }
      if (key === 'access') {
        modCustomer = {
          ...foundCustomer,
          [key]: [...foundCustomer[key], modifiedObject as AccessType],
        }
      }
      if (key === 'social') {
        modCustomer = {
          ...foundCustomer,
          [key]: [...foundCustomer[key], modifiedObject as SocialType],
        }
      }
    }

    modCustomer && CustomerDispatch(modifyCustomer(modCustomer))
  }

  const modifyExisting_CustomerData = (
    modifiedObject: AddressType | SocialType | AccessType | null | undefined,
    FoundCustomerCallBack: () => { key: string | undefined; foundCustomer: CustomerDataType | undefined },
  ) => {
    const { key, foundCustomer } = FoundCustomerCallBack() as { key: string; foundCustomer: CustomerDataType | undefined }
    let modCustomer: CustomerDataType | undefined = undefined

    if (key && foundCustomer) {
      if (key === 'address') {
        modCustomer = {
          ...foundCustomer,
          [key]: foundCustomer[key].map((data, index) => (index === openModifyModal.addressData.rowId ? (modifiedObject as AddressType) : data)),
        }
      }

      if (key === 'access') {
        modCustomer = {
          ...foundCustomer,
          [key]: foundCustomer[key].map((data, index) => (index === openModifyModal.accessData.rowId ? (modifiedObject as AccessType) : data)),
        }
      }
      if (key === 'social') {
        modCustomer = {
          ...foundCustomer,
          [key]: foundCustomer[key].map((data, index) => (index === openModifyModal.socialData.rowId ? (modifiedObject as SocialType) : data)),
        }
      }
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
    setOpenModifyModal(InitOpenModal)
  }

  return <ModifyForm submitHandler={handleSubmit} handleCancel={handleCancel} />
}
