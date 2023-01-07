import './modify-all-customer-data.css'

import { CustomerDataType } from '../../../DATASTORE/data-types/main.data.types/customer-data-types'
import { Input } from '../../input/input-component'
import { CustomButton } from '../../tools/button/submit/custom-button-component'
import { Addresses } from '../addresses/addresses-component'

type ModifyAllCustomerData = { customerData: CustomerDataType | undefined }
export const ModifyAllCustomerData = ({ customerData }: ModifyAllCustomerData): JSX.Element => {
  return (
    <form className='modify-form'>
      <div>
        <fieldset>
          <legend>General</legend>
          <Input label='company' defaultValue={customerData?.companyName} />
          <fieldset>
            <legend>{'Contact (primary)'}</legend>
            <Input label='name' defaultValue={customerData?.access[0].person} />
            <Input label='email' defaultValue={customerData?.access[0].email} />
          </fieldset>
        </fieldset>
      </div>
      <div>
        <fieldset>
          <legend>{'Addresses (primary)'}</legend>
          {customerData?.address && <Addresses data={customerData.address} />}
        </fieldset>
      </div>
      <div>
        <fieldset>
          <legend>{'Accesses (primary)'}</legend>
          {customerData?.access && <></>}
        </fieldset>
      </div>
      <div>
        <fieldset>
          <legend>Social</legend>
          {customerData?.social && <></>}
        </fieldset>
      </div>
      <div className='button-container'>
        <CustomButton value={'submit'} />
        <CustomButton type={'button'} value={'cancel'} handler={() => {}} />
      </div>
    </form>
  )
}
