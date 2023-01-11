import { CustomButton } from '../../../tools/button/submit/custom-button-component'
import './table-header-component.css'

type TableHeaderType = { title: string; headerValues: string[]; handler: () => void; isNarrowColumn?: boolean }

export const TableHeader = ({ title, headerValues, handler, isNarrowColumn = false }: TableHeaderType): JSX.Element => {
  return (
    <div className='full-details-header'>
      <div className='full-details-title'>
        <div className={`full-details-title-column ${isNarrowColumn ? 'narrow' : ''}`}>
          {headerValues.map((value, i) => (
            <p key={`${value}_${i}`}>{value}</p>
          ))}
        </div>
        <CustomButton color={'green'} value={`new ${title}`} handler={handler} />
      </div>
    </div>
  )
}
