import { SyntheticEvent, useState } from 'react'
import './input-component.css'

type InputType = { label: string; defaultValue: string }
export const Input = ({ label, defaultValue }: Partial<InputType>): JSX.Element => {
  // const [value, setValue] = useState('')

  // const handleChangeValue = (event: SyntheticEvent<HTMLInputElement>) => {
  //   const value = event.target as HTMLInputElement
  // }

  return (
    <div className={`input-container ${label}`}>
      <label htmlFor={`input-field-${label}`}>{label}</label>
      <input type='text' name={`input-field-${label}`} defaultValue={defaultValue} />
    </div>
  )
}

//  onChange = { handleChangeValue }
