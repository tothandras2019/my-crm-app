import { CustomButton } from '../../../tools/button/submit/custom-button-component'
import './table-header-component.css'

type TableHeaderType = { title: string; headerValues: string[] }

export const TableHeader = ({ title, headerValues }: TableHeaderType): JSX.Element => {
  return (
    <div className='full-details-header'>
      <h4>{title}</h4>
      <div className='full-details-title'>
        {headerValues.map((value, i) => (
          <p key={`${value}_${i}`}>{value}</p>
        ))}
        <CustomButton value={'add'} />
      </div>
    </div>
  )
}
