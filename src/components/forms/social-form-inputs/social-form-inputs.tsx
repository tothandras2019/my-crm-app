import { SocialType } from '../../../DATASTORE/data-types/main.data.types/customer-data-types'
import { Input } from '../../tools/input/input-component'

type SocialFormInputsType = { socialData: SocialType }
export const SocialFormInputs = ({ socialData }: Partial<SocialFormInputsType>) => {
  return (
    <fieldset>
      <legend>Social</legend>
      <Input label='media' defaultValue={socialData?.media} />
      <Input label='link' defaultValue={socialData?.link} />
    </fieldset>
  )
}
