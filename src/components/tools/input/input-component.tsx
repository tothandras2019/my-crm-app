import { SyntheticEvent, useState } from 'react'
import './input-component.css'

type InputType = { label: string; defaultValue: string }
export const Input = ({ label, defaultValue }: Partial<InputType>): JSX.Element => (
  <div className={`input-container ${label}`}>
    {label && <label htmlFor={`input-field-${label}`}>{label}</label>}
    <input type='text' name={`input-field-${label}`} defaultValue={defaultValue} />
  </div>
)
