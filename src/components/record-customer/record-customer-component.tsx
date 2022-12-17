import './record-customer-component.css'
import { Input } from '../input/input-component'
import { SyntheticEvent, useContext } from 'react'
import { InitCustomersType, LeadEnum, LifecicyleEnum, ProductCategoryEnum } from '../../DATASTORE/data-types/data-types'
import { CustomerContext } from './../../DATASTORE/contacts-reducer'
import { CustomButton } from '../tools/button/submit/custom-button-component'

export const RecordCustomers = () => {
  const { dispatch } = useContext(CustomerContext)

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    const target = event.target as HTMLFormElement
    const formDataArray: string[] = []
    Object.entries(target).forEach(([id, item]) => item instanceof HTMLInputElement && formDataArray.push(item.value))

    const [company, name, position, email, country, code, city, building, street, zip, emailMain, telephone, media, link] = formDataArray

    let companyDetails: InitCustomersType = {
      id: 0,
      companyName: company,
      contacts: [{ name: name, position: position, email: email }],
      address: [
        {
          country: country,
          code: code,
          city: city,
          building: parseInt(building),
          street: street,
          zip: parseInt(zip),
        },
      ],
      access: [{ email: emailMain }, { telephone: telephone }],
      social: [{ media: media, link: link }],
      status: {
        lifecycleState: LifecicyleEnum.opportunity,
        leadState: LeadEnum.open,
      },
      contract: {
        total: 0,
      },
      subscribed: {
        products: [],
      },
      period: { from: 2022, to: 2025 },
    }

    dispatch({ type: 'ADD/CUSTOMER', payload: companyDetails })
  }
  return (
    <main>
      <h1>Record customer</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <fieldset>
            <legend>General</legend>
            <Input label='company' />
            <fieldset>
              <legend>Contacts</legend>
              <Input label='name' />
              <Input label='position' />
              <Input label='email' />
            </fieldset>
          </fieldset>
        </div>
        <div>
          <fieldset>
            <legend>Address</legend>
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
            <legend>Access</legend>
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
          <CustomButton type={'button'} value={'cancel'} />
        </div>
      </form>
    </main>
  )
}
