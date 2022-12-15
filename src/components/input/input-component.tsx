import { SyntheticEvent, useState } from 'react'
import './input-component.css'
export const Input = ({ label }: { label: string }): JSX.Element => {
  // const [value, setValue] = useState('')

  // const handleChangeValue = (event: SyntheticEvent<HTMLInputElement>) => {
  //   const value = event.target as HTMLInputElement
  // }

  return (
    <div className={`input-container ${label}`}>
      <label htmlFor={`input-field-${label}`}>{label}</label>
      <input type='text' name={`input-field-${label}`} />
    </div>
  )
}

//  onChange = { handleChangeValue }
