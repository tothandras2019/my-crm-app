import './record-customer-component.css'
import { Input } from './../../tools/input/input-component'
import { FormEvent, Fragment, useContext, useEffect, useState } from 'react'
import { LeadEnum, LifecicyleEnum } from '../../../DATASTORE/data-types/data-types'
import { CustomButton } from '../../tools/button/submit/custom-button-component'
import { InitManagerMenuOptions, OtherActionContexts } from '../../../utility/contexts/action.context'
import { ManageDataFrame } from '../../manage-data-frame/manage-data-frame-component'
import { CustomerDataType } from '../../../DATASTORE/data-types/main.data.types/customer-data-types'
import { MainContext } from '../../../utility/contexts/main.context'
import { addCustomer, modifyCustomer } from '../../../DATASTORE/data-types/man.data.reducers/customer-reducer/customer.data.actions'
import { AddressFormInputs } from '../../forms/address-form-inputs/address-form-inputs'
import { SocialFormInputs } from '../../forms/social-form-inputs/social-form-inputs'
import { AccessFormInputs } from '../../forms/access-form-inputs/access-form-inputs'

type ManageCustomersFormType = { isModification: boolean; customerData: CustomerDataType | undefined }
export const ManageCustomersForm = ({ isModification = false, customerData }: Partial<ManageCustomersFormType>) => {
  // const { dispatch } = useContext(CustomerContext)
  const { SetMenuManagerOpenOption } = useContext(OtherActionContexts)

  const { customers } = useContext(MainContext)
  const { customerState, CustomerDispatch } = customers

  const [newCustomerID, setNewCustomerID] = useState<number | string | null>(null)
  const [showAll, setShowAll] = useState<boolean>(false)

  useEffect(() => {
    if (!customerState) return
    const length = customerState?.length
    if (length <= 0) return

    if (isModification && customerData) return setNewCustomerID(customerData.id)

    const id = parseInt(customerState[length - 1].id) + 1
    setNewCustomerID(id)
  }, [customerState])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const target = event.target as HTMLFormElement

    const formDataArray: string[] = retreiveFromData(target)
    const registerCustomerData: CustomerDataType = fillCustomerData(formDataArray)

    isModification ? CustomerDispatch(modifyCustomer(registerCustomerData)) : CustomerDispatch(addCustomer(registerCustomerData))
  }

  const retreiveFromData = (target: HTMLFormElement): string[] => {
    const formDataArray: string[] = []
    Object.values<HTMLInputElement>(target).forEach((item) => {
      item instanceof HTMLInputElement && formDataArray.push(item.value)
    })
    return formDataArray
  }

  const fillCustomerData = (formDataArray: string[]): CustomerDataType => {
    const [company, name, email, telephone, country, code, city, building, street, zip, media, link] = formDataArray

    return {
      id: newCustomerID ? newCustomerID?.toString() : '0',
      companyName: company,
      address: [
        {
          primary: true,
          country: country,
          code: code,
          city: city,
          building: parseInt(building),
          street: street,
          zip: zip,
        },
      ],
      access: [
        {
          primary: true,
          person: name,
          email: email,
          telephone: telephone,
        },
      ],
      social: [
        {
          media: media,
          link: link,
        },
      ],
      status: {
        lifecycleState: LifecicyleEnum.open,
        leadState: LeadEnum.open,
      },
    }
  }

  const handleCancel = () => SetMenuManagerOpenOption(InitManagerMenuOptions)

  return (
    <ManageDataFrame>
      <Fragment>
        <h1>{isModification ? 'Modify customer' : 'add new customer'}</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <fieldset>
              <legend>General</legend>
              <Input label='company' defaultValue={customerData?.companyName} />
            </fieldset>
            <AccessFormInputs />
          </div>
          <div>
            <AddressFormInputs />
          </div>
          <div>
            <SocialFormInputs />
          </div>
          <div className='button-container'>
            <CustomButton value={isModification ? 'modify' : 'submit'} />
            <CustomButton type={'button'} value={'cancel'} handler={handleCancel} />
          </div>
        </form>
      </Fragment>
    </ManageDataFrame>
  )
}
