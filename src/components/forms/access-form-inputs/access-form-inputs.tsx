import { AccessType } from '../../../DATASTORE/data-types/main.data.types/customer-data-types'
import { Input } from '../../tools/input/input-component'

type AccessFormInputsType = { accessData: AccessType }
export const AccessFormInputs = ({ accessData }: Partial<AccessFormInputsType>) => {
  return (
    <fieldset>
      <legend>{'Access'}</legend>
      <Input label='name' defaultValue={accessData?.person} />
      <Input label='email' defaultValue={accessData?.email} />
      <Input label='telephone' defaultValue={accessData?.telephone} />
    </fieldset>
  )
}
