import './select-element-component.css'

import { FormEvent, useEffect } from 'react'
import { ServiceCategory, Unit } from '../../../DATASTORE/data-types/main.data.types/product-data-types'

type SelectElementType = {
  inputKey: string
  value: string
  optionEnum: Unit | ServiceCategory
  handler: ({ returnLabel, value }: { returnLabel: string; value: string }) => void
}

export const SelectElement = ({ inputKey, value, optionEnum, handler }: SelectElementType): JSX.Element => {
  const handle_onChange = (event: FormEvent<HTMLSelectElement>) => {
    const target = event.target as HTMLSelectElement
    handler({ returnLabel: inputKey, value: target.value })
  }

  return (
    <div className={`input-container ${inputKey}`}>
      <label htmlFor={`input-field-${inputKey}`}>{inputKey}</label>
      <select key={`${inputKey}_${value}`} defaultValue={value} onChange={handle_onChange}>
        {Object.entries(optionEnum).map(([key, value], index) => (
          <option key={`${key}_${value}_${index}`} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  )
}
