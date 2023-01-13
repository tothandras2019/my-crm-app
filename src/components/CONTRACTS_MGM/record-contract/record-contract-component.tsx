import { FormEvent } from 'react'
import { ManageDataFrame } from '../../manage-data-frame/manage-data-frame-component'
import { OpenCloseButton } from '../../tools/button/open-close/open-close-button-component'
import { CustomButton } from '../../tools/button/submit/custom-button-component'
import { Input } from '../../tools/input/input-component'
import { InputFieldSetForm } from './../../forms/product-form-inputs/product-form-inputs-component'

export const RecordOrders = (): JSX.Element => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
  }
  const handleCancel = () => {}
  return (
    <ManageDataFrame>
      <div>
        <form onSubmit={handleSubmit}>
          <InputFieldSetForm title={'product'} data={undefined} />
          <CustomButton color={'green'} value={'submit'} type={'submit'} />
          <OpenCloseButton color={'yellow'} pageTextValue={'cancel'} handler={handleCancel} />
        </form>
      </div>
    </ManageDataFrame>
  )
}
