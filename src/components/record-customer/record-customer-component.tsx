import './record-customer-component.css'
import { Input } from '../input/input-component'
import { FormEvent, Fragment, SyntheticEvent, useContext } from 'react'
import { InitCustomersType, LeadEnum, LifecicyleEnum, ProductCategoryEnum } from '../../DATASTORE/data-types/data-types'
import { CustomerContext } from './../../DATASTORE/contacts-reducer'
import { CustomButton } from '../tools/button/submit/custom-button-component'
import { InitManagerMenuOptions, PathContext } from '../../utility/contexts/action.context'
import { ManageDataFrame } from '../manage-data-frame/manage-data-frame-component'
import { CustomerDataType } from '../../DATASTORE/data-types/main.data.types/customer-data-types'
import { MainContext } from '../../utility/contexts/main.context'
import { addCustomer } from '../../DATASTORE/data-types/man.data.reducers/customer-reducer/customer.data.actions'

export const RecordCustomers = () => {
  const { dispatch } = useContext(CustomerContext)
  const { SetMenuManagerOpenOption } = useContext(PathContext)
  const { customers } = useContext(MainContext)
  const { CustomerDispatch } = customers

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const target = event.target as HTMLFormElement
    const formDataArray: string[] = []
    Object.values<HTMLInputElement>(target).forEach((item) => item instanceof HTMLInputElement && formDataArray.push(item.value))

    const [company, name, position, email, country, code, city, building, street, zip, emailMain, telephone, media, link] = formDataArray

    const registerCustomerData: CustomerDataType = {
      id: 'n/a',
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
        lifecycleState: '',
        leadState: '',
      },
    }

    CustomerDispatch(addCustomer(registerCustomerData))

    // dispatch({ type: 'ADD/CUSTOMER', payload: companyDetails })
  }

  const handleCancel = () => SetMenuManagerOpenOption(InitManagerMenuOptions)

  return (
    <ManageDataFrame>
      <Fragment>
        <h1>Record customer</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <fieldset>
              <legend>General</legend>
              <Input label='company' />
              <fieldset>
                <legend>{'Contact (primary)'}</legend>
                <Input label='name' />
                <Input label='position' />
                <Input label='email' />
              </fieldset>
            </fieldset>
          </div>
          <div>
            <fieldset>
              <legend>{'Address (primary)'}</legend>
              <Input label='country' />
              <Input label='country code' />
              <Input label='city' />
              <Input label='building' />
              <Input label='street' />
              <Input label='zip' />
            </fieldset>
          </div>
          <div>
            <fieldset>
              <legend>{'Access (primary)'}</legend>
              <Input label='e-mail' />
              <Input label='telephone' />
            </fieldset>
          </div>
          <div>
            <fieldset>
              <legend>Social</legend>
              <Input label='media' />
              <Input label='link' />
            </fieldset>
          </div>
          <div className='button-container'>
            <CustomButton />
            <CustomButton type={'button'} value={'delete'} />
            <CustomButton type={'button'} value={'cancel'} handler={handleCancel} />
          </div>
        </form>
      </Fragment>
    </ManageDataFrame>
  )
}
