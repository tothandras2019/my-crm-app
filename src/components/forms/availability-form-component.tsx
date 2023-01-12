import { FormEvent, useContext } from 'react'
import { AddressType, AccessType, SocialType } from '../../DATASTORE/data-types/main.data.types/customer-data-types'
import { AvailabilityContext } from '../../utility/contexts/contacts-data/contacts-data-context'
import { Input } from '../tools/input/input-component'
import { CustomButton } from '../tools/button/submit/custom-button-component'
import { AccessFormInputs } from './access-form-inputs/access-form-inputs'
import { AddressFormInputs } from './address-form-inputs/address-form-inputs'
import { SocialFormInputs } from './social-form-inputs/social-form-inputs'

type ModifyFormType = {
  submitHandler: (event: FormEvent<HTMLFormElement>) => void
  handleCancel: () => void
}
export const ModifyForm = ({ submitHandler, handleCancel }: Partial<ModifyFormType>): JSX.Element => {
  const { openModifyModal } = useContext(AvailabilityContext)
  const { access: accessData, address: addressData, social: socialData } = openModifyModal
  return (
    <form className='modify-form' onSubmit={submitHandler}>
      <div>
        {addressData.isAddNew ? <AddressFormInputs /> : addressData.data && <AddressFormInputs addressData={addressData.data} />}
        {socialData.isAddNew ? <SocialFormInputs /> : socialData.data && <SocialFormInputs socialData={socialData.data} />}
        {accessData.isAddNew ? <AccessFormInputs /> : accessData.data && <AccessFormInputs accessData={accessData.data} />}
      </div>

      <div className='button-container'>
        <CustomButton value={'submit'} />
        <CustomButton type={'button'} value={'cancel'} handler={handleCancel} />
      </div>
    </form>
  )
}
