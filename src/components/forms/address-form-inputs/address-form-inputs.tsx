import { AddressType } from '../../../DATASTORE/data-types/main.data.types/customer-data-types'
import { Input } from '../../tools/input/input-component'

type AddressFormInputsType = { addressData: AddressType }
export const AddressFormInputs = ({ addressData }: Partial<AddressFormInputsType>) => {
  return (
    <fieldset>
      <legend>Address</legend>
      <Input label='country' defaultValue={addressData?.country} />
      <Input label='country code' defaultValue={addressData?.code} />
      <Input label='city' defaultValue={addressData?.city} />
      <Input label='building' defaultValue={addressData?.toString()} />
      <Input label='street' defaultValue={addressData?.street} />
      <Input label='zip' defaultValue={addressData?.zip?.toString()} />
    </fieldset>
  )
}
