import { SyntheticEvent, useState } from 'react'
import './input-component.css'
export const Input = ({ label }: { label: string }): JSX.Element => {
  const [value, setValue] = useState('')

  const handleChangeValue = (event: SyntheticEvent<HTMLInputElement>) => {
    const value = event.target as HTMLInputElement
    console.log(value.value)
  }

  return (
    <div className='input-container'>
      <label htmlFor='input-field'>{label}</label>
      <input type='text' name='input-field' onChange={handleChangeValue} />
    </div>
  )
}
