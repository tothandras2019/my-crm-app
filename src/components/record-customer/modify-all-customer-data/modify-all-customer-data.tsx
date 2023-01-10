import './modify-all-customer-data.css'
import { AccessType, AddressType, CustomerDataType, SocialType } from '../../../DATASTORE/data-types/main.data.types/customer-data-types'
import { Input } from '../../input/input-component'
import { CustomButton } from '../../tools/button/submit/custom-button-component'
import { Addresses } from '../addresses/addresses-component'
import { FormEvent, useContext, useEffect, useState } from 'react'
import { InitOpenModal, OpenModalContext } from '../../../utility/contexts/contacts-data-modification/manage.modifications.context'
import { MainContext } from '../../../utility/contexts/main.context'
import { modifyCustomer } from '../../../DATASTORE/data-types/man.data.reducers/customer-reducer/customer.data.actions'

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

    const modifiedObject = fillDataObject(valuesArray)

    isModification ? modifyExistingCustomerData(modifiedObject) : addNewCustomerData(modifiedObject)
  }

  const addNewCustomerData = (modifiedObject: AddressType | AccessType | SocialType | null) => {
    const foundCustomer: CustomerDataType | undefined = customerState.find((customer) => customer.id === openModifyModal.customerId)
    if (!foundCustomer) return

    let key: string | undefined = undefined

    if (addressData.data) key = 'address'
    if (accessData.data) key = 'access'
    if (socialData.data) key = 'social'

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
  }

  const modifyExistingCustomerData = (modifiedObject: AddressType | SocialType | AccessType | null) => {
    let key: string | undefined = undefined
    const foundCustomer: CustomerDataType | undefined = customerState.find((customer) => customer.id === openModifyModal.customerId)
    if (!foundCustomer) return

    let modCustomer: CustomerDataType | undefined = undefined
    if (addressData.data) key = 'address'
    if (accessData.data) key = 'access'
    if (socialData.data) key = 'social'

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

  const fillDataObject = (object: string[]) => {
    let result: AddressType | AccessType | SocialType | null = null
    if (addressData.data) {
      const [country, code, city, building, street, zip] = object

      result = {
        primary: addressData.data.primary,
        country: country,
        code: code,
        city: city,
        building: parseInt(building),
        street: street,
        zip: zip,
      }
    }

    if (socialData) {
      const [media, link] = object
      result = {
        media: media,
        link: link,
      }
    }
    if (accessData.data) {
      const [person, email, telephone] = object
      result = {
        primary: accessData.data.primary,
        person: person,
        email: email,
        telephone: telephone,
      }
    }
    return result
  }

  const handleCancel = () => {
    setOpenModifyModal(InitOpenModal)
  }

  return (
    <form className='modify-form' onSubmit={handleSubmit}>
      <div>
        {addressData.data && (
          <fieldset>
            <legend>Address</legend>
            <Input label='country' defaultValue={addressData.data.country} />
            <Input label='country code' defaultValue={addressData.data.code} />
            <Input label='city' defaultValue={addressData.data.city} />
            <Input label='building' defaultValue={addressData.data.building.toString()} />
            <Input label='street' defaultValue={addressData.data.street} />
            <Input label='zip' defaultValue={addressData.data.zip} />
          </fieldset>
        )}
        {socialData.data && (
          <fieldset>
            <legend>Social</legend>
            <Input label='media' defaultValue={socialData.data.media} />
            <Input label='link' defaultValue={socialData.data.link} />
          </fieldset>
        )}
        {accessData.data && (
          <fieldset>
            <legend>{'Access (primary)'}</legend>
            <Input label='name' defaultValue={accessData.data.person} />
            <Input label='email' defaultValue={accessData.data.email} />
            <Input label='telephone' defaultValue={accessData.data.telephone} />
          </fieldset>
        )}
      </div>

      <div className='button-container'>
        <CustomButton value={'submit'} />
        <CustomButton type={'button'} value={'cancel'} handler={handleCancel} />
      </div>
    </form>
  )
}
