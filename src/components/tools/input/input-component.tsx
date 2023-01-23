import { FormEvent, SyntheticEvent, useState } from 'react'
import './input-component.css'

type InputType = { label: string; defaultValue: string; handler: ({ returnLabel, value }: { returnLabel: string; value: string }) => void }

export const Input = ({ label, defaultValue, handler }: Partial<InputType>): JSX.Element => {
  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    if (!label || !handler) return

    handler({ returnLabel: label, value: target.value })
  }
  return (
    <div className={`input-container ${label}`}>
      {label && <label htmlFor={`input-field-${label}`}>{label}</label>}
      <input type='text' name={`input-field-${label}`} defaultValue={defaultValue} onChange={handleChange} />
    </div>
  )
}
