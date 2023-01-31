import { FormEvent, SyntheticEvent, useState } from 'react'
import './input-component.css'

type InputType = {
  type: string
  label: string
  defaultValue: string
  handler: ({ returnLabel, value }: { returnLabel: string; value: string }) => void
}

export const Input = ({ type, label, defaultValue, handler }: Partial<InputType>): JSX.Element => {
  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    if (!label || !handler) return

    handler({ returnLabel: label, value: target.value })
  }
  return (
    <div className={`input-container ${label}`}>
      {label && <label htmlFor={`input-field-${label}`}>{label}</label>}
      <input type={type} name={`input-field-${label}`} defaultValue={defaultValue} onChange={handleChange} />
    </div>
  )
}
