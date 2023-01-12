import { FormEvent } from 'react'
import './custom-button-component.css'

type CustomButtonType = {
  color: string
  value: string
  placeholder: string
  type: string
  handler: (e: FormEvent<any>) => void
  id: number | string | undefined
}
export const CustomButton = ({
  color = '',
  value,
  placeholder = 'search company',
  type = 'submit',
  handler,
  id,
}: Partial<CustomButtonType>): JSX.Element => {
  return <input className={color} id={`${id}`} type={type} value={value} onClick={handler} placeholder={placeholder} />
}
