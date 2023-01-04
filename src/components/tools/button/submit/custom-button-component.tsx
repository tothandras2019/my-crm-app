import { FormEvent } from 'react'
import './custom-button-component.css'

type CustomButtonType = { value: string; type: string; handler: (e: FormEvent<any>) => void; id: number | string | undefined }
export const CustomButton = ({ value = 'register', type = 'submit', handler, id }: Partial<CustomButtonType>): JSX.Element => {
  return <input id={`${id}`} type={type} value={value} onClick={handler} />
}
