import { ServiceProductType } from '../../../DATASTORE/data-types/main.data.types/product-data-types'
import { Input } from '../../tools/input/input-component'
type InputFieldSetFormType = { title: string; data: ServiceProductType | undefined }
export const InputFieldSetForm = ({ title = 'n/a', data }: InputFieldSetFormType): JSX.Element => {
  return (
    <div>
      <fieldset>
        <legend>{title}</legend>
        {data && Object.keys(data).map((key) => <Input label={key} />)}
      </fieldset>
    </div>
  )
}
